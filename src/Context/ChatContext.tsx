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
	const [userChatsError, setUserChatsError] = useState<any>(null); // review later
	const [potentialChats, setPotentialChats] = useState<User[]>([]);
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);
	const [messages, setMessages] = useState<Message[] | null>(null);
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
	const [messagesError, setMessagesError] = useState<any>(null); // review later
	const [sendTextMessageError, setSendTextMessageError] = useState<any>(null); // review later
	const [newMessage, setNewMessage] = useState<Message | null>(null); // review later
	// const [socket, setSocket] = useState<any>(null);
	const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
	const [notifications, setNotifications] = useState<Message[] | null>([]);
	// review later
	const [allUsers, setAllUsers] = useState<User[]>([]);

	// useEffect(() => {
	// 	const newSocket = io(`${SOCKET_URL}`);
	// 	setSocket(newSocket);

	// 	return () => {
	// 		newSocket.disconnect();
	// 	};
	// }, [user]);

	// add user to online users
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

	// let socket: any = null;

	// Start Code with Gerry
	// useEffect(() => {
	// 	socket = io(`${SOCKET_URL}`);
	// 	socket.emit('addNewUser', user?._id);
	// 	socket.on('getOnlineUsers', (res: User[]) => {
	// 		setOnlineUsers(res);
	// 	});
	// 	return () => {
	// 		socket.off('getOnlineUsers');
	// 		socket.disconnect();
	// 	};
	// }, [user, socket]);
	// END Code with Gerry

	// send message
	// useEffect(() => {
	// 	if (socket === null) return;

	// 	const recipientId = currentChat?.members.find((id) => id !== user?.id);

	// 	socket.emit('sendMessage', { ...newMessage, recipientId });
	// }, [newMessage]);

	// receive message and notifications
	useEffect(() => {
		if (socket === null) return;

		socket.on('getMessage', (res) => {
			console.log(res, 'socket res here');

			if (res.recipientId === user._id) return;

			// here add more that just text
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
			console.log('getting users');
			const response = await getRequest(`${BASE_URL}/users`);
			if (response.error) {
				return console.log(`Error fetching users: `, response);
			}
			const pChats = response.filter((u: User) => {
				let isChatCreated = false;

				if (user?._id === u._id) return false;

				if (userChats) {
					// douple check this logic particularly some
					isChatCreated = userChats?.some((chat) => {
						return chat.members[0] === u._id || chat.members[1] === u._id;
					});
				}
				//
				return !isChatCreated;
			});
			// console.log('pChats', pChats);
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
				// might need to change the url
				const response = await getRequest(`${BASE_URL}/userChats/${user._id}`);
				setIsUserChatsLoading(false);

				if (response.error) {
					return setUserChatsError(response);
				}
				setUserChats(response);
			}
			// try {
			// 	const response = await getRequest(`${BASE_URL}/chats`, user.token);
			// 	setUserChats(response);
			// 	setIsUserChatsLoading(false);
			// } catch (error) {
			// 	setUserChatsError(error);
			// 	setIsUserChatsLoading(false);
			// }
		};
		getUserChats();
	}, [user, notifications]);

	useEffect(() => {
		const getMessages = async () => {
			setIsMessagesLoading(true);
			setMessagesError(null);
			// might need to change the url
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

	const updateCurrentChat = useCallback(
		(chat: Chat) => {
			console.log('chat updated');
			setCurrentChat(chat);
		},
		[currentChat]
	);

	const sendTextMessage = useCallback(
		async (
			textMessage: string,
			sender: User,
			currentChatId: string,
			setTextMessage: (message: string) => void
		) => {
			if (!textMessage) return console.log(`No message to send`);

			console.log('currentChatId', currentChatId);

			const response = await postRequest(`/message`, {
				chatId: currentChatId,
				senderId: sender._id,
				text: textMessage,
			});

			if (response.error) {
				return setSendTextMessageError(response);
			}

			// if (socket === null) return;

			console.log('currentchat', currentChat);
			const recipientId = currentChat?.members.find((id) => id !== user?.id);
			console.log('recipientId', recipientId);

			socket.emit('sendMessage', { textMessage, recipientId });

			// handle with message.length
			setNewMessage(response as Message); // review later
			setMessages(
				(prevMessages) => [...(prevMessages || []), response] as Message[]
			); // review later
			setTextMessage('');
		},
		[]
	);

	const createChat = useCallback(async (firstId: string, secondId: string) => {
		const response = await postRequest(
			// `${BASE_URL}/chats`,
			`/chat`,
			{
				firstId,
				secondId,
			}
		);

		if (response.error) {
			return console.log(`Error creating chat: `, response);
		}

		setUserChats((prevChats) => [...(prevChats || []), response] as Chat[]); // review later
	}, []);

	const markAllNotificationsAsRead = useCallback((notifications) => {
		const mNotifications = notifications.map((n) => {
			return { ...n, isRead: true };
		});

		setNotifications(mNotifications);
	}, []);

	const markNotificationAsRead = useCallback(
		(n, userChats, user, notifications) => {
			// find chat to open

			const disiredChat = userChats.find((chat) => {
				const chatMembers = [user._id, n.senderId];
				const isDesiredChat = chat?.members.every((member) => {
					return chatMembers.includes(member);
				});
				return isDesiredChat;
			});
			// mark notification as read
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
			// mark notification as read
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
