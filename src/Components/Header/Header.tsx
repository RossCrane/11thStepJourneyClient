import React from 'react';
import './Styles.css';
import HeaderAccount from '../HeaderAccount/HeaderAccount';
import logo from '../../assets/logo.png';
import Navbar from '../Navbar/Navbar';

const Header = () => {
	const isLoggedIn = false;

	return (
		<header className="header-container">
			<div className="logo-title-nav-container">
				<div className="logo-title-container">
					<img className="logo" src={logo} alt="" />
					<div className="header-title">
						11th Step
						<br />
						Journey
					</div>
				</div>
				<Navbar />
			</div>
			<HeaderAccount isLoggedIn={isLoggedIn} />
		</header>
	);
};

export default Header;
