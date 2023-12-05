import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { BASE_URL, getRequest } from '../Services/MessageService';

export const useFetchLatestMessage = (chat: string) => {
	const { newMessage, notifications } = useContext(ChatContext);
	const [latestMessage, setLatestMessage] = useState<any>(null);

	useEffect(() => {
		const getMessages = async () => {
			const response = await getRequest(`${BASE_URL}/messages/${chat?._id}`);

			if (response.error) {
				return console.log('Error getting messages...', error);
			}

			const lastMessage = response[response.length - 1];
			setLatestMessage(lastMessage);
		};
		getMessages();
	}, [newMessage, notifications]);
	return { latestMessage };
};
