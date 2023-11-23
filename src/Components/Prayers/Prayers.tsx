import React, { useState } from 'react';

interface AccordionProps {
	title: string;
	content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="accordion">
			<h1>Prayers</h1>
			<div className="accordion-header" onClick={toggleAccordion}>
				<h3>{title}</h3>
				<span>{isOpen ? '-' : '+'}</span>
			</div>
			{isOpen && <div className="accordion-content">{content}</div>}
		</div>
	);
};

export default Accordion;
