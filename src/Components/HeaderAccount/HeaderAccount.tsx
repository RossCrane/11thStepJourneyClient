import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import apiServiceJWT from '../../Services/AuthenticationService';
import './Styles.css';
import bell from '../../assets/bell.svg';
import loginIcon from '../../assets/loginicon.svg';
import logoutIcon from '../../assets/logouticon.svg';
import profileIcon from '../../assets/profileicon.svg';

// interface IAccountLinks {
// 	id: number;
// 	to: string;
// 	icon: string; // could be File or HTMLImageElement
// 	text: string;
// 	loggedInOnly?: boolean;
// }

// old code for manual login/logout
// interface IHeaderAccountProps {
// 	isLoggedIn: boolean;
// }

// const accountLinks: IAccountLinks[] = [
// 	{
// 		id: 0,
// 		to: '/',
// 		icon: profileIcon,
// 		text: 'Account Details',
// 		loggedInOnly: true,
// 	},
// 	{
// 		id: 1,
// 		to: '/',
// 		icon: bell,
// 		text: 'Notifications',
// 	},
// 	{
// 		id: 2,
// 		to: '/login',
// 		icon: logoutIcon,
// 		text: 'Log Out',
// 		loggedInOnly: true,
// 	},
// 	{
// 		id: 3,
// 		to: '/login',
// 		icon: loginIcon,
// 		text: 'Log In',
// 		loggedInOnly: false,
// 	},
// ];

const HeaderAccount: React.FC = () => {
	const { authenticated, setAuthenticated, logout } = useAuth(); // Use the context

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const accessToken = localStorage.getItem('token');
				if (accessToken) {
					await apiServiceJWT.profile(accessToken);

					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			} catch (error) {
				console.error('Authentication check failed:', error);
				setAuthenticated(false);
			}
		};

		checkAuthentication();
	}, [setAuthenticated]);

	// Add a function to handle logout
	const handleLogout = () => {
		logout(() => {
			// Additional logic on logout (e.g., redirect to home page)
		});
	};
	return (
		<div className="account-container">
			<ul>
				{/* Always display the bell icon */}
				<li>
					<div className="tooltip-container">
						<img className="icons" src={bell} alt="Notifications" />
						<span className="tooltip-text">Notifications</span>
					</div>
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
							<Link to="/login">
								<img className="icons" src={logoutIcon} alt="Log Out" />
								<span className="tooltip-text">Log Out</span>
							</Link>
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
