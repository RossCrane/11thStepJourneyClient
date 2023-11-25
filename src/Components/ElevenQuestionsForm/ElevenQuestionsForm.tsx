import { useState } from 'react';

interface Step {
	id: number;
	question: string;
}

interface StepFormProps {
	handleStepFormSubmit?: (formState: any) => void;
	steps: Step[];
}

export const ElevenQuestionsForm: React.FC<StepFormProps> = ({
	handleStepFormSubmit,
	steps,
}) => {
	const [currentStep, setCurrentStep] = useState(steps[0]);
	const [currentStepIdx, setCurrentStepIdx] = useState(0);
	const [formState, setFormState] = useState(() => {
		return steps.map((step) => ({ ...step, answer: '' }));
	});

	const isFirstStep = currentStepIdx === 0;
	const isLastStep = currentStepIdx === steps.length - 1;

	const handlePrevious = () => {
		setCurrentStepIdx((currStepIdx) => currStepIdx - 1);
		setCurrentStep(steps[currentStepIdx - 1]);
	};

	const handleNext = () => {
		setCurrentStepIdx((currStepIdx) => currStepIdx + 1);
		setCurrentStep(steps[currentStepIdx + 1]);
	};

	const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState((currFormState) => {
			return currFormState.map((step) => {
				if (currentStep.id === step.id) {
					return {
						...step,
						answer: e.target.value,
					};
				}
				return step;
			});
		});
	};

	return (
		<div>
			{/* Probably create a card component here instead of this div */}
			<div>
				{currentStep.question.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
				<input
					type="text"
					onChange={handleAnswerChange}
					value={formState[currentStepIdx].answer}
				/>
			</div>

			{!isFirstStep && <button onClick={handlePrevious}>Previous</button>}
			{!isLastStep && <button onClick={handleNext}>Next</button>}
			{isLastStep && (
				<button
					onClick={() => {
						handleStepFormSubmit?.(formState);
					}}
				>
					Send
				</button>
			)}
		</div>
	);
};
