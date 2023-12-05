import React, { useContext, useEffect, useRef, useState } from 'react';
import './Styles.css';
import { useAuth } from '../../../Context/AuthContext';
import { ChatContext } from '../../../Context/ChatContext';
import { useFetchRecipientUser } from '../../../Hooks/UseFetchRecipient';
import { Stack } from '@mui/material';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
// import SendIcon from '@mui/icons-material/Send';

interface ChatBoxProps {
	// Define props here
}

const ChatBox: React.FC<ChatBoxProps> = () => {
	const { user } = useAuth() as any; // Replace 'any' with the actual type
	const {
		currentChat,
		messages,
		isMessagesLoading,
		sendTextMessage,
		// messagesError,
	} = useContext(ChatContext) as any; // Replace 'any' with the actual type
	const { recipientUser } = useFetchRecipientUser(currentChat, user) as any; // Replace 'any' with the actual type
	const [textMessage, setTextMessage] = useState<string>('');
	const scroll = useRef<HTMLDivElement>(null);

	// console.log(textMessage, 'text message here');
	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}),
		[messages];

	if (!recipientUser)
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>
				No Conversations Selected Yet...
			</p>
		);

	if (isMessagesLoading)
		return <p style={{ textAlign: 'center', width: '100%' }}>Loading...</p>;

	return (
		<>
			<Stack spacing={4} className="chat-box">
				<div className="chat-header">
					<strong>{recipientUser?.firstname}</strong>
				</div>
				<Stack spacing={3} className="messages">
					{messages &&
						messages.map((message: any, index: number) => (
							<Stack
								key={index}
								sx={{
									alignSelf: 'flex-end',
									flexGrow: 0,
									...(message?.senderId === user?._id && { className: 'self' }),
								}}
								className={
									message?.senderId === user?._id ? 'message self' : 'message'
								}
								ref={scroll}
							>
								<span>{message.text}</span>
								<span className="message-footer">
									{moment(message.createdAt).calendar()}
								</span>
							</Stack>
						))}
				</Stack>
				<Stack
					direction={'row'}
					spacing={3}
					className="chat-input"
					sx={{ flexGrow: 0 }}
				>
					<InputEmoji
						value={textMessage}
						onChange={setTextMessage}
						fontFamily="nunita"
						borderColor="rgba(72, 112, 223, 0.2)"
					/>
					<button
						className="send-btn"
						onClick={() =>
							sendTextMessage(
								textMessage,
								user,
								currentChat._id,
								setTextMessage
							)
						}
					>
						Send
						{/* <SendIcon /> */}
					</button>
				</Stack>
			</Stack>
		</>
	);
};

export default ChatBox;

{
	/* <Stack
	key={index}
	className={`${
		message?.senderId === user?._id
			? 'message self align-self-end flex-grow-0'
			: 'message align-self-end flex-grow-0'
	}`}
></Stack>; */
}
