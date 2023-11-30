import React from 'react';

interface QuestionResponseEntry {
	questionNumber: number;
	response: string;
	date: string;
}

interface ElevenQuestionsHistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	history: QuestionResponseEntry[];
}

const ElevenQuestionsHistoryModal: React.FC<
	ElevenQuestionsHistoryModalProps
> = ({ isOpen, onClose, history }) => {
	return (
		<div
			style={{
				display: isOpen ? 'block' : 'none',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				backgroundColor: 'white',
				padding: '20px',
				borderRadius: '10px',
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
			}}
		>
			<button onClick={onClose}>Close</button>
			{history.map((entry, index) => (
				<div key={index}>
					<div>Date: {entry.date}</div>
					<div>
						Question {entry.questionNumber}: {entry.response}
					</div>
				</div>
			))}
		</div>
	);
};

export default ElevenQuestionsHistoryModal;
