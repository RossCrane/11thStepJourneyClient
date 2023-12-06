import React, { useContext, useEffect, useRef, useState } from 'react';
import './Styles.css';
import { useAuth } from '../../../Context/AuthContext';
import { ChatContext } from '../../../Context/ChatContext';
import { useFetchRecipientUser } from '../../../Hooks/UseFetchRecipient';
import { Stack } from '@mui/material';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { BASE_URL, getRequest } from '../../../Services/MessageService';
// import SendIcon from '@mui/icons-material/Send';

interface ChatBoxProps {
	// Define props here
}

const ChatBox: React.FC<ChatBoxProps> = () => {
	const { user } = useAuth() as any; // Replace 'any' with the actual type
	const {
		currentChat,
		messages,
		newMessage,
		isMessagesLoading,
		sendTextMessage,
		socket,
		// messagesError,
	} = useContext(ChatContext) as any; // Replace 'any' with the actual type

	// console.log(messages, 'messages here');
	//console.log(currentChat, 'current chat here');
	//console.log(user, 'user here');
	const [textMessage, setTextMessage] = useState<string>('');
	const scroll = useRef<HTMLDivElement>(null);
	// const [recipientId, setRecipientId] = useState<string | null>(null);
	const [recipientUser, setRecipientUser] = useState<any>(null);
	const [recipientId, setRecipientId] = useState<string | null>(null);

	const getUser = async () => {
		const foundRecipientId = currentChat?.members.find(
			(id) => id !== user?._id
		);
		if (!foundRecipientId) return null;

		setRecipientId(foundRecipientId);

		console.log('user in chatbox', user?._id);

		const response = await getRequest(`${BASE_URL}/userChats/${recipientId}`);
		// console.log(response, 'response here');

		if (response.error) {
			return console.log('error getting user');
		}
		setRecipientUser(response);
	};

	useEffect(() => {
		getUser();
		console.log(recipientId, 'recipient id here on change');
	}, [currentChat, newMessage]);

	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}),
		[messages];

	if (!recipientUser)
		return (
			<p style={{ textAlign: 'center', width: 'auto' }}>
				No Conversations Selected Yet...
			</p>
		);

	if (isMessagesLoading)
		return <p style={{ textAlign: 'center', width: 'auto' }}>Loading...</p>;

	const handleSendMessage = () => {
		if (currentChat && currentChat._id && recipientId) {
			setRecipientId(recipientId);
			sendTextMessage(
				textMessage,
				user,
				currentChat._id,
				setTextMessage,
				recipientId
			);
		} else {
			console.log('Current chat, chat ID, or recipient ID is not defined');
		}
	};

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
									flexGrow: 0,
									alignSelf:
										message?.senderId === user?._id ? 'flex-end' : 'flex-start',
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
					sx={{ flexGrow: 0, alignSelf: 'flex-end', bottom: 0 }}
				>
					<InputEmoji
						value={textMessage}
						onChange={setTextMessage}
						fontFamily="nunita"
						borderColor="rgba(72, 112, 223, 0.2)"
					/>
					<button className="send-btn" onClick={handleSendMessage}>
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
