import { useState } from 'react';
import {
	submitQuestionResponses,
	fetchElevenQuestionsHistory,
} from '../../Services/ElevenQuestionsService';
import ElevenQuestionsHistoryModal from '../ElevenQuestionsHistoryModal/ElevenQuestionsHistoryModal';

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
	const [history, setHistory] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const toggleModal = async () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) {
			try {
				const historyData = await fetchElevenQuestionsHistory();
				setHistory(historyData);
			} catch (error) {
				console.error('Error fetching question responses history:', error);
			}
		}
	};

	const handleSubmitResponses = async () => {
		try {
			const formattedResponses = formState.map((step) => ({
				questionNumber: step.id,
				response: step.answer,
			}));

			const response = await submitQuestionResponses(formattedResponses);
			console.log('Responses submitted:', response);
			handleStepFormSubmit?.(formattedResponses); // Optional callback
		} catch (error) {
			console.error('Error submitting responses:', error);
			// Handle submission error
		}
	};

	return (
		<div>
			<button onClick={toggleModal}>View History</button>
			<ElevenQuestionsHistoryModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				history={history}
			/>
			{/* Probably create a card component here instead of this div */}
			<p>When we retire at night we constructively review our day.</p>
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
			{isLastStep && <button onClick={handleSubmitResponses}>Send</button>}
		</div>
	);
};
