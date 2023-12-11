import { useEffect, useState } from 'react';
import { BASE_URL, getRequest } from '../Services/MessageService';

interface Chat {
	members: string[];
}

interface User {
	id: string;
}

export const useFetchRecipientUser = (chat: Chat | null, user: User | null) => {
	const [recipientUser, setRecipientUser] = useState<any>(null);
	const [error, setError] = useState<any>(null);

	const recipientId = chat?.members.find((id) => id !== user?.id);

	useEffect(() => {
		const getUser = async () => {
			if (!recipientId) return null;
			const response = await getRequest(`${BASE_URL}/users`);

			if (response.error) {
				return setError(response);
			}
			setRecipientUser(response);
		};
		getUser();
	}, [recipientId]);

	return { recipientUser };
};

export default useFetchRecipientUser;
