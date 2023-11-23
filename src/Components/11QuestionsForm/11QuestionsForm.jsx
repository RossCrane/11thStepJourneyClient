import React, { useState } from 'react';

const questions = [
	'Question 1',
	'Question 2',
	'Question 3',
	'Question 4',
	'Question 5',
	'Question 6',
	'Question 7',
	'Question 8',
	'Question 9',
	'Question 10',
	'Question 11',
];

const ElevenQuestionsForm = () => {
	const [responses, setResponses] = useState(Array(11).fill(''));

	const handleResponseChange = (index, value) => {
		const newResponses = [...responses];
		newResponses[index] = value;
		setResponses(newResponses);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission here
	};

	return (
		<form onSubmit={handleSubmit}>
			{questions.map((question, index) => (
				<div key={index}>
					<label htmlFor={`question-${index + 1}`}>{question}</label>
					<input
						type="text"
						id={`question-${index + 1}`}
						value={responses[index]}
						onChange={(e) => handleResponseChange(index, e.target.value)}
					/>
				</div>
			))}
			<button type="submit">Submit</button>
		</form>
	);
};

export default ElevenQuestionsForm;
