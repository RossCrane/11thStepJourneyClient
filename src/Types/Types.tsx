export interface ChatContextType {
	userChats: Chat[] | null;
	isUserChatsLoading: boolean;
	userChatsError: any; // review later
	potentialChats: User[]; // review later
	createChat: (firstId: string, secondId: string) => void;
	updateCurrentChat: (chat: Chat) => void;
	currentChat: Chat | null;
	messages: Message[] | null; // review later
	isMessagesLoading: boolean;
	messagesError: any; // review later
	sendTextMessage: (
		textMessage: string,
		sender: User,
		currentChatId: string,
		setTextMessage: (message: string) => void
	) => void;
	newMessage: Message | null;
}

export interface User {
	_id: string;
	// review later
}

export interface Chat {
	_id: string;
	members: string[];
	// review later
}

export interface Message {
	text: string;
	senderId: string;
	createdAt: string;
	// review later
}
