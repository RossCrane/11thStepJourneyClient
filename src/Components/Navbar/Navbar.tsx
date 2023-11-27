import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../../Utils/NavLinks';
import './Styles.css';

const Navbar = () => {
	return (
		<ul>
			{links.map((link) => (
				<li key={link.id}>
					<div className="tooltip-container">
						<img className="icons" src={link.icon} alt={link.text} />
						<span className="tooltip-text">{link.text}</span>
					</div>
				</li>
			))}
		</ul>
	);
};

export default Navbar;
