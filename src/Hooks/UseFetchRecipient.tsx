import { useEffect, useState } from 'react';
import { BASE_URL, getRequest } from '../Services/MessageService';

// fix later
interface Chat {
	members: string[]; // Adjust
}

interface User {
	id: string; // Adjust
}

export const useFetchRecipientUser = (chat: Chat | null, user: User | null) => {
	// todo: use a more specific type if available
	const [recipientUser, setRecipientUser] = useState<any>(null);
	//todo: use a more specific type if available
	const [error, setError] = useState<any>(null);

	const recipientId = chat?.members.find((id) => id !== user?.id);
	// console.log(recipientId, 'recipientId here');
	// This is getting an error I think
	useEffect(() => {
		const getUser = async () => {
			if (!recipientId) return null;
			// may need to change the url
			const response = await getRequest(`${BASE_URL}/userChats/${recipientId}`);
			//const data = await response.json();
			// console.log(response, 'response here');
			if (response.error) {
				return setError(response);
			}
			setRecipientUser(response);
		};
		getUser();
	}, [recipientId]);

	return { recipientUser, error }; // May need to delete error and manage it later.
};

export default useFetchRecipientUser;
