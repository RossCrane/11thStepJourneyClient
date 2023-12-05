import React, { useContext } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useFetchRecipientUser } from '../../Hooks/UseFetchRecipient';
import './Styles.css';
import { ChatContext } from '../../Context/ChatContext';
import { ChatContextType, User, Chat } from '../../Types/Types';
import { unreadNotificationsFunc } from '../../Utils/UnreadNotifications';
import { useFetchLatestMessage } from '../../Hooks/UseFetchLatestMessage';
import moment from 'moment';
// import image from '../../Assets/Images/placeholder.png';

interface UserChatProps {
	chat: Chat;
	user: User;
}

const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
	const validChat = chat && Array.isArray(chat.members) ? chat : null;

	const { recipientUser } = useFetchRecipientUser(validChat, user);
	//const { recipientUser } = useFetchRecipientUser(chat, user);
	const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
		useContext(ChatContext) as ChatContextType;
	const { latestMessage } = useFetchLatestMessage(chat);

	const unreadNotifications = unreadNotificationsFunc(notifications);
	const thisUserNotifications = unreadNotifications?.filter(
		(n) => n.senderId == recipientUser?._id
	);

	const isOnline = onlineUsers?.some(
		(user) => user?.userId === recipientUser?._id
	);

	// console.log(recipientUser, 'recipient user here');

	const handleClick = () => {
		if (thisUserNotifications?.length > 0) {
			markThisUserNotificationsAsRead(thisUserNotifications, notifications);

			//console.log('Stack clicked');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	};

	const truncateText = (text) => {
		let shortText = text?.substring(0, 20);

		if (text.length > 20) {
			shortText = shortText + '...';
		}
		return shortText;
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
							{latestMessage?.text && (
								<span>{truncateText(latestMessage?.text)}</span>
							)}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
				>
					<Typography className="date" variant="body2">
						{moment(latestMessage?.createdAt).calendar()}
					</Typography>
					<Typography
						className={
							thisUserNotifications?.length > 0 ? 'this-user-notifications' : ''
						}
						variant="body2"
					>
						{thisUserNotifications?.length > 0
							? thisUserNotifications.length
							: ''}
					</Typography>
					<span className={isOnline ? 'user-online' : ''}></span>
				</Box>
			</Stack>
			User Chat
		</div>
	);
};

export default UserChat;
