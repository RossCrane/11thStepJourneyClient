import React, { useState } from 'react';
import { elevenQustionsTemplate } from '../../Utils/11Questions';

const ElevenQuestionsForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState({});

	const handleNext = () => {
		// Validate and save the answer for the current question
		const currentQuestion = elevenQustionsTemplate[currentStep];
		const answer = ''; // Get the user's answer

		setAnswers({ ...answers, [currentQuestion.title]: answer });

		// Move to the next step if not on the final step
		if (currentStep < elevenQustionsTemplate.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			// Handle submission of all answers (e.g., send them to a server)
			console.log('All answers submitted:', answers);
		}
	};

	return (
		<div>
			{currentStep < elevenQustionsTemplate.length ? (
				<div>
					<h2>{elevenQustionsTemplate[currentStep].title}</h2>
					<p>{elevenQustionsTemplate[currentStep].content}</p>
					{/* Render input for the question */}
					<button onClick={handleNext}>Next</button>
				</div>
			) : (
				<div>
					<p>Thank you for completing the wizard!</p>
				</div>
			)}
		</div>
	);
};

export default ElevenQuestionsForm;
