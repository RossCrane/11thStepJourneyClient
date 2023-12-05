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
	onlineUsers: User[] | null;
	notifications: Notification[] | null;
}

export interface Notification {
	senderId: string;
	isRead: boolean;
	date: Date;
}

export interface User {
	_id: string;
	id?: string;
	firstname?: string;
	// review later
}

export interface Chat {
	_id: string;
	members: string[];
	firstname?: string;
	// review later
}

export interface Message {
	text: string;
	senderId: string;
	createdAt: string;
	// review later
}

//Socket.io

// this was imported from socket.io-client not sure why they did not provide a Buffer type
export interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
	hello: () => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	name: string;
	age: number;
}
