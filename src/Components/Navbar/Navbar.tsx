import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../Utils/NavLinks';
import './Styles.css';

const Navbar = () => {
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
		</ul>
	);
};

export default Navbar;
