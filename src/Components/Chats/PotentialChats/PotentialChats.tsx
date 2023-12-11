import React, { useContext } from 'react';
import { ChatContext } from '../../../Context/ChatContext';
import { useAuth } from '../../../Context/AuthContext';
import './Styles.css';
import { User } from '../../../Types/Types';

interface PotentialChatsProps {}

interface ChatContextType {
	potentialChats: User[];
	createChat: (firstId: string, secondId: string) => void;
	onlineUsers: User[];
}

const PotentialChats: React.FC<PotentialChatsProps> = () => {
	const { user } = useAuth();
	const { potentialChats, createChat, onlineUsers } = useContext(
		ChatContext
	) as ChatContextType;

	if (!user) {
		return <div>No user data available</div>;
	}

	return (
		<>
			<div className="all-users">
				{potentialChats &&
					potentialChats.map((u, index) => {
						return (
							<div
								className="single-user"
								key={index}
								onClick={() => createChat(user._id, u._id)}
							>
								{u.firstName}
								<span
									className={
										onlineUsers?.some((user) => user?.userId === u?._id)
											? 'user-online'
											: ''
									}
								></span>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default PotentialChats;
