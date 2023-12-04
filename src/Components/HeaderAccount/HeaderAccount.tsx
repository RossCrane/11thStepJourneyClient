import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import apiServiceJWT from '../../Services/AuthenticationService';
import './Styles.css';
import bell from '../../assets/bell.svg';
import loginIcon from '../../assets/loginicon.svg';
import logoutIcon from '../../assets/logouticon.svg';
import profileIcon from '../../assets/profileicon.svg';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const HeaderAccount: React.FC = () => {
	const { authenticated, setAuthenticated, logout } = useAuth();

	const navigate = useNavigate();

	// useEffect(() => {
	// 	const checkAuthentication = async () => {
	// 		try {
	// 			const accessToken = localStorage.getItem('token');
	// 			if (accessToken) {
	// 				await apiServiceJWT.profile(accessToken);

	// 				setAuthenticated(true);
	// 			} else {
	// 				setAuthenticated(false);
	// 			}
	// 		} catch (error) {
	// 			console.error('Authentication check failed:', error);
	// 			setAuthenticated(false);
	// 		}
	// 	};

	// 	checkAuthentication();
	// }, []);

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
