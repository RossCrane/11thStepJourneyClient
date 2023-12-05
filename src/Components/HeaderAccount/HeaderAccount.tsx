import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import apiServiceJWT from '../../Services/AuthenticationService';
import './Styles.css';
import bell from '../../assets/bell.svg';
import loginIcon from '../../assets/loginicon.svg';
import logoutIcon from '../../assets/logouticon.svg';
import profileIcon from '../../assets/profileicon.svg';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../Context/ChatContext';
import { unreadNotificationsFunc } from '../../Utils/UnreadNotifications';
import moment from 'moment';
// import { toast } from 'react-toastify';

const HeaderAccount: React.FC = () => {
	const { authenticated, logout, user } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);
	const {
		notifications,
		userChats,
		allUsers,
		markAllNotificationsAsRead,
		markNotificationAsRead,
	} = useContext(ChatContext);

	const unreadNotifications = unreadNotificationsFunc(notifications);
	const modifiedNotifications = notifications
		? notifications.map((n) => {
				const sender = allUsers.find((user) => user._id === n.senderId);

				return {
					...n,
					senderName: sender?.firstname,
				};
		  })
		: [];

	const navigate = useNavigate();

	const handleLogout = () => {
		logout(() => {
			navigate('/');
		});
	};

	return (
		<div className="account-container">
			<ul>
				{/* Always display the bell icon */}
				<li>
					<div className="tooltip-container">
						<img
							className="icons"
							src={bell}
							alt="Notifications"
							onClick={() => setIsOpen(!isOpen)}
						/>
						{unreadNotifications?.length === 0 ? null : (
							<span className="notification-count">
								<span>{unreadNotifications?.length}</span>
							</span>
						)}
						<span className="tooltip-text">Notifications</span>
					</div>
					{isOpen ? (
						<div className="notification-box">
							<div className="notifications-header">
								<h3>Notifications</h3>
								<div
									className="mark-as-read"
									onClick={() => markAllNotificationsAsRead(notifications)}
								>
									Mark all as read
								</div>
							</div>
							{modifiedNotifications?.length === 0 ? (
								<span className="notification">No Notifications</span>
							) : null}
							{modifiedNotifications &&
								modifiedNotifications.map((n, index) => {
									return (
										<div
											key={index}
											className={
												n.isRead ? 'notification' : 'notification not-read'
											}
											onClick={() => {
												markNotificationAsRead(
													n,
													userChats,
													user,
													notifications
												);
												setIsOpen(false);
											}}
										>
											<span>{`${n.senderName} sent you a new message`}</span>
											<span className="notification-time">
												{moment(n.date).calendar()}
											</span>
										</div>
									);
								})}
						</div>
					) : null}
				</li>

				{/* Display Account Details link based on isLoggedIn */}
				{authenticated && (
					<li>
						<div className="tooltip-container">
							<Link to="/account">
								<img
									className="icons"
									src={profileIcon}
									alt="Account Details"
								/>
								<span className="tooltip-text">Account Details</span>
							</Link>
						</div>
					</li>
				)}

				{/* Display Log Out link based on isLoggedIn */}
				{authenticated && (
					<li>
						<div className="tooltip-container">
							<button onClick={handleLogout} className="icon-button">
								<img className="icons" src={logoutIcon} alt="Log Out" />
								<span className="tooltip-text">Log Out</span>
							</button>
						</div>
					</li>
				)}

				{/* Display Log In link based on isLoggedIn */}
				{!authenticated && (
					<li>
						<div className="tooltip-container">
							<Link to="/login">
								<img className="icons" src={loginIcon} alt="Log In" />
								<span className="tooltip-text">Log In</span>
							</Link>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default HeaderAccount;
