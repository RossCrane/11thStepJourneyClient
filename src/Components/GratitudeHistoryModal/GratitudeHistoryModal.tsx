import React from 'react';
import './Styles.css';

interface GratitudeHistoryEntry {
	_id: string;
	userId: string;
	items: {
		gratitudeNumber: number;
		gratitude: string;
		_id: string;
	}[];
	date: string;
}

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
	const groupByDate = (entries: GratitudeHistoryEntry[]) => {
		return entries.reduce((acc, entry) => {
			const dateKey = new Date(entry.date).toLocaleDateString();
			if (!acc[dateKey]) {
				acc[dateKey] = [];
			}
			acc[dateKey].push(...entry.items);
			return acc;
		}, {} as Record<string, { gratitudeNumber: number; gratitude: string; _id: string }[]>);
	};

	const groupedHistory = groupByDate(history);

	return (
		<div className={`gratitude-history-modal ${isOpen ? 'show' : ''}`}>
			<button className="close-button" onClick={onClose}>
				Close
			</button>
			<h3>My Gratitude History:</h3>
			{Object.entries(groupedHistory).map(([date, items]) => (
				<div key={date} className="gratitude-entry">
					<div>{date}</div>
					{items.map((item) => (
						<div key={item._id} className="gratitude-item">
							-{item.gratitude}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default GratitudeHistoryModal;
