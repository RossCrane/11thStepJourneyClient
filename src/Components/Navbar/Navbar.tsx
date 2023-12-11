import { Link } from 'react-router-dom';
import { links } from '../../Utils/NavLinks';
import './Styles.css';
import { useAuth } from '../../Context/AuthContext';
import message_icon from '../../assets/message_icon.svg';

const Navbar = () => {
	const { authenticated } = useAuth();
	return (
		<ul className="navbar-container">
			{links.map((link) => (
				<li key={link.id}>
					<div className="tooltip-container">
						<Link to={link.to}>
							<img className="icons" src={link.icon} alt={link.text} />
							<span className="tooltip-text">{link.text}</span>
						</Link>
					</div>
				</li>
			))}
			{authenticated && (
				<div className="tooltip-container">
					<Link to={'/chat'}>
						<img className="icons" src={message_icon} alt="chat" />
						<span className="tooltip-text">{'Chat'}</span>
					</Link>
				</div>
			)}
		</ul>
	);
};

export default Navbar;
