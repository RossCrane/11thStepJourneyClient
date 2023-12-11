import React, { useContext } from 'react';
import { Container, Stack, Box, Typography } from '@mui/material';
import { ChatContext } from '../../Context/ChatContext';
import './Styles.css';
import UserChat from '../UserChat/UserChat';
import { useAuth } from '../../Context/AuthContext';
import PotentialChats from './PotentialChats/PotentialChats';
import ChatBox from './ChatBox/ChatBox';

import { ChatContextType, Chat, User } from '../../Types/Types';

const Chats: React.FC = () => {
	const { user } = useAuth() as { user: User | null };
	const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
		useContext(ChatContext) as ChatContextType;

	if (!ChatContext) {
		return <div>No chat context available</div>;
	}

	const handleChatClick = (chat: Chat) => {
		if (chat) {
			console.log('chat clicked', chat);
			updateCurrentChat(chat);
		} else {
			console.log('Failed to update current chat: invalid chat data');
		}
	};

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
							<Box key={index} onClick={() => handleChatClick(chat)}>
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
