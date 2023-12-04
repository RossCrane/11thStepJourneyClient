import { createContext, useState } from 'react';
import { BASE_URL, getRequest, postRequest } from '../Services/MessageService';

export const ChatContext = createContext<any>(null);

// also uses user so will need to find a way to do so.
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [userChatsError, setUserChatsError] = useState(null);

	return (
		<ChatContext.Provider
			value={{
				userChats,
				isUserChatsLoading,
				userChatsError,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
