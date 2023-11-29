import React from 'react';

// Define the type for each gratitude history entry
interface GratitudeHistoryEntry {
	gratitudeNumber: number;
	gratitude: string;
	date: string;
}

// Define the props the component will accept
interface GratitudeHistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	history: GratitudeHistoryEntry[];
}

const GratitudeHistoryModal: React.FC<GratitudeHistoryModalProps> = ({
	isOpen,
	onClose,
	history,
}) => {
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
						Item {entry.gratitudeNumber}: {entry.gratitude}
					</div>
				</div>
			))}
		</div>
	);
};

export default GratitudeHistoryModal;
