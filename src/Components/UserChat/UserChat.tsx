import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useFetchRecipientUser } from '../../Hooks/UseFetchRecipient';
import './Styles.css';
// import image from '../../Assets/Images/placeholder.png';

interface User {
	_id: string;
	id: string;
	firstname?: string;
	// review later
}

interface Chat {
	_id: string;
	members: string[];
	firstname?: string;
	// review later
}

interface UserChatProps {
	chat: Chat;
	user: User;
}

const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
	const validChat = chat && Array.isArray(chat.members) ? chat : null;

	const { recipientUser } = useFetchRecipientUser(validChat, user);
	//const { recipientUser } = useFetchRecipientUser(chat, user);

	console.log(recipientUser, 'recipient user here');

	const handleClick = () => {
		console.log('Stack clicked');
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	};

	return (
		<div>
			<Stack
				direction="row"
				gap={3}
				sx={{
					alignItems: 'center',
					cursor: 'pointer', // Default cursor style
					'&:hover': {
						cursor: 'pointer', // Cursor style on hover
					},
				}}
				className="user-card"
				role="button"
				tabIndex={0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ marginRight: 2 }}>
						{/* Import an image here */}
						{/* <img src={image} alt="Placeholder" height="35px" /> */}
						image
					</Box>
					<Box className="text-content">
						<Typography variant="subtitle1">
							Name, {recipientUser?.firstname}
						</Typography>
						<Typography className="text" variant="body2">
							Text Message
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
				>
					<Typography className="date" variant="body2">
						12/12/2022
					</Typography>
					<Typography className="this-user-notifications" variant="body2">
						2
					</Typography>
					<span className="user-online"></span>
				</Box>
			</Stack>
			User Chat
		</div>
	);
};

export default UserChat;
