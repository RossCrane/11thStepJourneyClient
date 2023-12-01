import React from 'react';
import './Styles.css';
import { elevenQuestionsTemplate } from '../../Utils/ElevenQuestionsTemplate';

interface QuestionResponse {
	questionNumber: number;
	response: string;
}

interface HistoryEntry {
	responses: QuestionResponse[];
	date: string;
}

interface ElevenQuestionsHistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	history: HistoryEntry[];
}

const ElevenQuestionsHistoryModal: React.FC<
	ElevenQuestionsHistoryModalProps
> = ({ isOpen, onClose, history }) => {
	// Function to find the question text by ID
	const findQuestionById = (id: number) => {
		const question = elevenQuestionsTemplate.find((q) => q.id === id);
		return question ? question.question : 'Unknown Question';
	};

	return (
		<div className={`question-history-modal ${isOpen ? 'show' : ''}`}>
			<button onClick={onClose}>Close</button>
			<div className="history-content">
				{Array.isArray(history) &&
					history.map((entry, index) => (
						<div key={index} className="history-entry">
							<div className="date">
								Date: {new Date(entry.date).toLocaleDateString()}
							</div>
							<div className="responses">
								{entry.responses.map((response, idx) => (
									<div key={idx} className="response">
										<div className="question">
											{findQuestionById(response.questionNumber)}
										</div>
										{/* might want to change how this looks later */}
										<div className="answer">Answer: {response.response}</div>
									</div>
								))}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ElevenQuestionsHistoryModal;
