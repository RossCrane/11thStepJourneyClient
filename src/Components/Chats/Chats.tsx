import React, { useContext } from 'react';
import { Container, Stack, Box, Typography } from '@mui/material';
import { ChatContext } from '../../Context/ChatContext';
import './Styles.css';
import UserChat from '../UserChat/UserChat';
import { useAuth } from '../../Context/AuthContext';
import PotentialChats from './PotentialChats/PotentialChats';
import ChatBox from './ChatBox/ChatBox';

import { ChatContextType, Chat, User, Message } from '../../Types/Types';

// Assuming you have defined these types
// interface User {
// 	_id: string;
// 	// other properties
// }

// interface Chat {
// 	// properties of a chat
// }

// // Assuming the ChatContext provides these types
// interface ChatContextType {
// 	userChats: Chat[] | null;
// 	isUserChatsLoading: boolean;
// 	userChatsError: any; // Replace 'any' with a more specific error type
// 	updateCurrentChat: (chat: Chat) => void;
// }

const Chats: React.FC = () => {
	const { user } = useAuth() as { user: User | null }; // review later
	const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
		useContext(ChatContext) as ChatContextType;

	if (!ChatContext) {
		// Handle the case when chatContext is null
		return <div>No chat context available</div>;
	}

	// console.log(userChats, 'user chats here');

	return (
		<Container>
			<PotentialChats />
			{userChats && userChats.length > 0 && (
				<Stack direction="row" spacing={4}>
					<Stack
						className="message-box"
						sx={{ flexGrow: 1.7, paddingRight: 3 }}
						spacing={3}
					>
						{isUserChatsLoading && <Typography>Loading...</Typography>}
						{userChats.map((chat, index) => (
							<Box key={index} onClick={() => updateCurrentChat(chat)}>
								<UserChat chat={chat} user={user} />
							</Box>
						))}
						<Typography></Typography>
					</Stack>
					<ChatBox />
				</Stack>
			)}
		</Container>
	);
};

export default Chats;
// 	<div>
// 		<Container>
// 			{userChats?.length < 1 ? null : (
// 				<Stack direction="horizontal" gap={4}>
// 					<Stack className="messages-box flex-grow-0 pe-3" gap={3}>
// 						{isUserChatsLoading && <p>Loading...</p>}
// 						{userChats?.map((chat: any, index: number) => {
// 							return (
// 								<div key={index}>
// 									<UserChat chat={chat} user={user} />
// 								</div>
// 							);
// 						})}
// 						List
// 					</Stack>
// 					<p>Chats</p>
// 				</Stack>
// 			)}
// 		</Container>
// 	</div>
// );
//};
