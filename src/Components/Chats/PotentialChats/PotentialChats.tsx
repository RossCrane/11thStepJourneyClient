import React, { useContext } from 'react';
import { ChatContext } from '../../../Context/ChatContext';
import { useAuth } from '../../../Context/AuthContext';
import './Styles.css';

interface User {
	_id: string;
	firstName?: string;
	// other properties of User
}

interface PotentialChatsProps {
	// might need props here
}

interface ChatContextType {
	potentialChats: User[];
	createChat: (firstId: string, secondId: string) => void;
}

const PotentialChats: React.FC<PotentialChatsProps> = () => {
	const { user } = useAuth(); // Cast to the expected type
	const { potentialChats, createChat } = useContext(
		ChatContext
	) as ChatContextType;

	if (!user) {
		// Handle the case when user is null
		return <div>No user data available</div>;
	}

	return (
		<>
			<div className="all-users">
				{potentialChats &&
					potentialChats.map((u, index) => (
						<div
							className="single-user"
							key={index}
							onClick={() => createChat(user._id, u._id)}
						>
							{u.firstName}
							<span className="user-online"></span>
						</div>
					))}
			</div>
		</>
	);
};

export default PotentialChats;
