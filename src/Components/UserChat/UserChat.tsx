import React, { useContext, useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useFetchRecipientUser } from '../../Hooks/UseFetchRecipient';
import './Styles.css';
import { ChatContext } from '../../Context/ChatContext';
import { ChatContextType, User, Chat } from '../../Types/Types';
import { unreadNotificationsFunc } from '../../Utils/UnreadNotifications';
import { useFetchLatestMessage } from '../../Hooks/UseFetchLatestMessage';
import moment from 'moment';
import defaultProfileIcon from '../../assets/default_profile_icon.svg';
import { BASE_URL, getRequest } from '../../Services/MessageService';

interface UserChatProps {
	chat: Chat;
	user: User;
}

const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
	const [currentChat, setCurrentChat] = useState<Chat[] | null>(null);
	const validChat = chat && Array.isArray(chat.members) ? chat : null;

	const { recipientUser } = useFetchRecipientUser(validChat, user);
	//const { recipientUser } = useFetchRecipientUser(chat, user);
	const {
		onlineUsers,
		notifications,
		markThisUserNotificationsAsRead,
		updateCurrentChat,
	} = useContext(ChatContext) as ChatContextType;
	const { latestMessage } = useFetchLatestMessage(chat);

	const unreadNotifications = unreadNotificationsFunc(notifications);
	const thisUserNotifications = unreadNotifications?.filter(
		(n) => n.senderId == recipientUser?._id
	);

	const isOnline = onlineUsers?.some(
		(user) => user?.userId === recipientUser?._id
	);

	const handleClick = () => {
		if (thisUserNotifications?.length > 0) {
			markThisUserNotificationsAsRead(thisUserNotifications, notifications);
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

	useEffect(() => {
		const getUserChats = async () => {
			if (user?._id) {
				const response = await getRequest(`${BASE_URL}/chats`);

				if (response.error) {
					return response;
				}

				// updateCurrentChat(
				// 	response.find((chatRes) => chatRes.chatId === chat._id)
				// );
				setCurrentChat(response.find((chatRes) => chatRes.chatId === chat._id));
			}
		};
		getUserChats();
	}, []);

	// console.log('userChats', userChats);

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
						<img src={defaultProfileIcon} alt="Placeholder" height="40px" />
					</Box>
					<Box className="text-content">
						<Typography variant="subtitle1" align="left">
							{' '}
							{
								currentChat?.members?.find((member) => member._id !== user?._id)
									?.firstName
							}
						</Typography>
						<Typography className="text" variant="body2" align="left">
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
		</div>
	);
};

export default UserChat;
