import React, { createContext, useEffect, useState, useCallback } from 'react';
import { BASE_URL, getRequest, postRequest } from '../Services/MessageService';
import { ChatContextType, User, Chat, Message } from '../Types/Types';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
if (!SOCKET_URL) {
	throw new Error('Missing Socket URL');
}

const socket = io(`${SOCKET_URL}`);

export const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
	children: React.ReactNode;
	user: User;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
	children,
	user,
}) => {
	const [userChats, setUserChats] = useState<Chat[] | null>(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
	const [userChatsError, setUserChatsError] = useState<any>(null);
	const [potentialChats, setPotentialChats] = useState<User[]>([]);
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);
	const [messages, setMessages] = useState<Message[] | null>(null);
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
	const [messagesError, setMessagesError] = useState<any>(null);
	const [sendTextMessageError, setSendTextMessageError] = useState<any>(null);
	const [newMessage, setNewMessage] = useState<Message | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
	const [notifications, setNotifications] = useState<Message[] | null>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);

	useEffect(() => {
		if (socket === null) return;
		socket.emit('addNewUser', user?._id);
		socket.on('getOnlineUsers', (res: User[]) => {
			setOnlineUsers(res);
		});
		return () => {
			socket.off('getOnlineUsers');
		};
	}, [socket]);

	useEffect(() => {
		if (socket === null) return;

		socket.on('getMessage', (res) => {
			console.log(res, 'socket res here');

			console.log('res.recipientId', res.recipientId, 'user._id', user._id);
			if (res.recipientId !== user._id) return;

			setMessages((prev) => [...(prev || []), { text: res.textMessage }]);
		});

		socket.on('getNotification', (res) => {
			const isChatOpen = currentChat?.members.some((id) => id === res.senderId);

			if (isChatOpen) {
				setNotifications((prev) => [{ ...res, isRead: true }, ...(prev || [])]);
			} else {
				setNotifications((prev) => [res, ...prev]);
			}
		});

		return () => {
			socket.off('getMessage');
			socket.off('getNotification');
		};
	}, [socket, currentChat]);

	useEffect(() => {
		const getUsers = async () => {
			const response = await getRequest(`${BASE_URL}/users`);
			if (response.error) {
				return console.log(`Error fetching users: `, response);
			}
			const pChats = response.filter((u: User) => {
				let isChatCreated = false;

				if (user?._id === u._id) return false;

				if (userChats) {
					isChatCreated = userChats?.some((chat) => {
						return chat.members[0] === u._id || chat.members[1] === u._id;
					});
				}
				return !isChatCreated;
			});
			setPotentialChats(pChats);
			setAllUsers(response);
		};
		getUsers();
	}, [userChats]);

	useEffect(() => {
		const getUserChats = async () => {
			if (user?._id) {
				setIsUserChatsLoading(true);
				setUserChatsError(null);
				const response = await getRequest(`${BASE_URL}/userChats/${user._id}`);
				setIsUserChatsLoading(false);

				if (response.error) {
					return setUserChatsError(response);
				}
				setUserChats(response);
			}
		};
		getUserChats();
	}, [user, notifications]);

	useEffect(() => {
		const getMessages = async () => {
			setIsMessagesLoading(true);
			setMessagesError(null);

			const response = await getRequest(
				`${BASE_URL}/messages/${currentChat?._id}`
			);
			setIsMessagesLoading(false);

			if (response.error) {
				return setMessagesError(response);
			}
			setMessages(response);
		};
		getMessages();
	}, [currentChat]);

	const updateCurrentChat = useCallback((chat: Chat) => {
		setCurrentChat(chat);
	}, []);

	const sendTextMessage = useCallback(
		async (
			textMessage: string,
			sender: User,
			currentChatId: string,
			setTextMessage: (message: string) => void,
			recipientId: string
		) => {
			if (!textMessage) return console.log(`No message to send`);

			const response = await postRequest(`/message`, {
				chatId: currentChatId,
				senderId: sender._id,
				text: textMessage,
			});

			if (response.error) {
				return setSendTextMessageError(response);
			}

			setNewMessage(response as Message);
			setMessages(
				(prevMessages) => [...(prevMessages || []), response] as Message[]
			);
			setTextMessage('');
		},
		[]
	);

	const createChat = useCallback(async (firstId: string, secondId: string) => {
		const response = await postRequest(`/chat`, {
			firstId,
			secondId,
		});

		if (response.error) {
			return console.log(`Error creating chat: `, response);
		}

		setUserChats((prevChats) => [...(prevChats || []), response] as Chat[]);
	}, []);

	const markAllNotificationsAsRead = useCallback((notifications) => {
		const mNotifications = notifications.map((n) => {
			return { ...n, isRead: true };
		});

		setNotifications(mNotifications);
	}, []);

	const markNotificationAsRead = useCallback(
		(n, userChats, user, notifications) => {
			const disiredChat = userChats.find((chat) => {
				const chatMembers = [user._id, n.senderId];
				const isDesiredChat = chat?.members.every((member) => {
					return chatMembers.includes(member);
				});
				return isDesiredChat;
			});

			const mNotifications = notifications.map((el) => {
				if (n.senderId === el.senderId) {
					return { ...n, isRead: true };
				} else {
					return el;
				}
			});
			updateCurrentChat(disiredChat);
			setNotifications(mNotifications);
		},
		[]
	);

	const markThisUserNotificationsAsRead = useCallback(
		(thisUserNotifications, notifications) => {
			const mNotifications = notifications.map((el) => {
				let notification;

				thisUserNotifications.forEach((n) => {
					if (n.senderId === el.senderId) {
						notification = { ...n, isRead: true };
					} else {
						notification = el;
					}
				});
				return notification;
			});
			setNotifications(mNotifications);
		},
		[]
	);

	return (
		<ChatContext.Provider
			value={{
				userChats,
				isUserChatsLoading,
				userChatsError,
				potentialChats,
				createChat,
				updateCurrentChat,
				currentChat,
				messages,
				isMessagesLoading,
				messagesError,
				sendTextMessage,
				newMessage,
				onlineUsers,
				notifications,
				allUsers,
				markAllNotificationsAsRead,
				markNotificationAsRead,
				markThisUserNotificationsAsRead,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
