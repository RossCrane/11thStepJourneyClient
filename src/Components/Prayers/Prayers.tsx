import React, { useState } from 'react';
import { accordionPrayerData } from '../../Utils/PrayersData';
import './Styles.css';

interface IAccordionProps {
	title: string;
	prayer: string;
}

const Accordion: React.FC<IAccordionProps> = ({ title, prayer }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		// Learn to recognize this pattern and change it to the one below.
		// setIsOpen(!isOpen);
		setIsOpen((currOpen) => !currOpen);
	};

	return (
		<div className="accordion">
			<div className="accordion-title" onClick={toggleAccordion}>
				<h3 className="accortian-title-text">{title}</h3>
				{/* <span>{isOpen ? '-' : '+'}</span> */}
			</div>
			{isOpen && <div className="accordion-content">{prayer}</div>}
		</div>
	);
};

const Prayers: React.FC = () => {
	return (
		<div className="prayer-accordion">
			<h1>Prayers</h1>
			{accordionPrayerData.map((prayerData, index) => (
				<Accordion
					key={index}
					title={prayerData.title}
					prayer={prayerData.prayer}
				/>
			))}
		</div>
	);
};

export default Prayers;
