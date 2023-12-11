import { useState } from 'react';
import {
	submitQuestionResponses,
	fetchElevenQuestionsHistory,
} from '../../Services/ElevenQuestionsService';
import ElevenQuestionsHistoryModal from '../ElevenQuestionsHistoryModal/ElevenQuestionsHistoryModal';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import './Styles.css';

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
	const { authenticated } = useAuth();
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

	const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (!isLastStep) {
				handleNext();
			} else {
				copyToClipboard();
				handleSubmitResponses();
			}
		}
	};

	const toggleModal = async () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) {
			try {
				const response = await fetchElevenQuestionsHistory();
				toast.success('History data fetched successfully!');
				if (response.success) {
					setHistory(response.data);
				} else {
					setHistory([]);
					toast.error('Failed to fetch question responses history.');
				}
			} catch (error) {
				setHistory([]);
				toast.error('Error fetching question responses history.');
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
			handleStepFormSubmit?.(formattedResponses);
			toast.success('Responses submitted successfully.');
		} catch (error) {
			toast.error('Failed to submit responses.');
		}
	};

	const formatQuestionsAndAnswers = () => {
		const currentDate = new Date().toLocaleString();
		let formattedText = `11th Step\n${currentDate}\n\n`;

		formState.forEach((step) => {
			formattedText += `${step.id}. ${step.question}\n ${step.answer}\n\n`;
		});

		return formattedText;
	};

	const copyToClipboard = () => {
		const textToCopy = formatQuestionsAndAnswers();
		navigator.clipboard.writeText(textToCopy).then(
			() => {
				toast.success('Copied to clipboard successfully.');
			},
			(err) => {
				toast.error('Failed to copy text.');
			}
		);
	};

	return (
		<div className="eleven-questions-form-container">
			{authenticated && (
				<button className="view-history-button" onClick={toggleModal}>
					View History
				</button>
			)}
			<ElevenQuestionsHistoryModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				history={history}
			/>

			<p className="question-text">
				When we retire at night we constructively review our day.
			</p>
			<div className="question-container">
				{currentStep.question.split('\n').map((line, index) => (
					<p className="question-text" key={index}>
						{line}{' '}
					</p>
				))}

				<textarea
					onChange={handleAnswerChange}
					onKeyDown={handleKeyDown}
					value={formState[currentStepIdx].answer}
					placeholder="Your answer here"
				/>
			</div>
			<div className="nav-buttons">
				{!isFirstStep && (
					<button className="nav-button" onClick={handlePrevious}>
						Previous
					</button>
				)}
				{!isLastStep && (
					<button className="nav-button" onClick={handleNext}>
						Next
					</button>
				)}
				{isLastStep && (
					<div>
						{authenticated && (
							<button className="send-button" onClick={handleSubmitResponses}>
								Save
							</button>
						)}
						<button className="copy-button" onClick={copyToClipboard}>
							Copy to Clipboard
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
