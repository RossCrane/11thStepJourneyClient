export interface ChatContextType {
	userChats: Chat[] | null;
	isUserChatsLoading: boolean;
	userChatsError: any;
	potentialChats: User[];
	createChat: (firstId: string, secondId: string) => void;
	updateCurrentChat: (chat: Chat) => void;
	currentChat: Chat | null;
	messages: Message[] | null;
	isMessagesLoading: boolean;
	messagesError: any;
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
}

export interface Chat {
	_id: string;
	members: string[];
	firstname?: string;
}

export interface Message {
	text: string;
	senderId: string;
	createdAt: string;
}

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
