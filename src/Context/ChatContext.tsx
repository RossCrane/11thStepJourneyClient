import React, { createContext, useEffect, useState, useCallback } from 'react';
import { BASE_URL, getRequest, postRequest } from '../Services/MessageService';
import { ChatContextType, User, Chat, Message } from '../Types/Types';

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

	// console.log(currentChat, 'current chat here');
	// console.log(messages, 'messages here');

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
					// douple check this logic particularly some
					isChatCreated = userChats?.some((chat) => {
						return chat.members[0] === u._id || chat.members[1] === u._id;
					});
				}
				//
				return !isChatCreated;
			});
			setPotentialChats(pChats);
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
					setIsUserChatsLoading(false);
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
	}, [user]);

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

	const updateCurrentChat = useCallback((chat: Chat) => {
		setCurrentChat(chat);
	}, []);

	const sendTextMessage = useCallback(
		async (
			textMessage: string,
			sender: User,
			currentChatId: string,
			setTextMessage: (message: string) => void
		) => {
			if (!textMessage) return console.log(`No message to send`);

			const response = await postRequest(
				`${BASE_URL}/messages`,
				JSON.stringify({
					chatId: currentChatId,
					senderId: sender._id,
					text: textMessage,
				})
			);

			if (response.error) {
				return setSendTextMessageError(response);
			}

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
			`${BASE_URL}/chats`,
			JSON.stringify({
				firstId,
				secondId,
			})
		);

		if (response.error) {
			return console.log(`Error creating chat: `, response);
		}

		setUserChats((prevChats) => [...(prevChats || []), response] as Chat[]); // review later
	}, []);

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
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
