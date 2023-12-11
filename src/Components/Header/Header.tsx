import './Styles.css';
import HeaderAccount from '../HeaderAccount/HeaderAccount';
import logo from '../../assets/logo.png';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header-container">
			<div className="logo-title-nav-container">
				<div className="logo-title-container">
					<div className="tooltip-container">
						<Link to={'/'}>
							<img className="logo" src={logo} alt="Home" />
							<span className="tooltip-text">Home</span>
						</Link>
					</div>

					<div className="tooltip-container">
						<Link to={'/'} className="header-title-link">
							<div className="header-title">
								11th Step
								<br />
								Journey
							</div>
						</Link>
					</div>
				</div>
				<Navbar />
			</div>
			<HeaderAccount />
		</header>
	);
};

export default Header;
