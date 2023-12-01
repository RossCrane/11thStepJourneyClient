import React, { useState } from 'react';
import {
	fetchGratitudeHistory,
	createGratitudeEntry,
} from '../../Services/GratitudeService';
import './Styles.css';
import GratitudeHistoryModal from '../GratitudeHistoryModal/GratitudeHistoryModal';
import { useAuth } from '../../Context/AuthContext';

interface IGratitudeListProps {
	onSave: (items: GratitudeItem[]) => void;
}

interface GratitudeItem {
	gratitudeNumber: number;
	gratitude: string;
}

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

const GratitudeList: React.FC<IGratitudeListProps> = ({ onSave }) => {
	const [items, setItems] = useState<string[]>(['']);
	const { authenticated } = useAuth();
	const [history, setHistory] = useState<GratitudeHistoryEntry[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = async () => {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) {
			try {
				const response = await fetchGratitudeHistory();
				if (response.success) {
					setHistory(response.data);
				} else {
					console.error('Failed to fetch gratitude history');
				}
			} catch (error) {
				console.error('Error fetching gratitude history:', error);
			}
		}
	};

	const handleItemChange = (index: number, newValue: string) => {
		setItems((currItems) => {
			const newItems = [...currItems];
			newItems[index] = newValue;
			return newItems;
		});
	};

	const handleAddItem = () => {
		if (items.length < 10) {
			setItems([...items, '']);
		}
	};

	const handleRemoveItem = (index: number) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	const handleSave = async () => {
		const formattedItems: GratitudeItem[] = items
			.filter((item) => item.trim() !== '')
			.map((gratitude, index) => ({
				gratitudeNumber: index + 1,
				gratitude,
			}));

		// add tostify here.
		try {
			const savedEntry = await createGratitudeEntry(formattedItems);
			console.log('Gratitude Entry Saved:', savedEntry);
		} catch (error) {
			console.error('Error saving gratitude entry:', error);
		}
	};

	const formatGratitudesForClipboard = () => {
		if (!history || history.length === 0) {
			return 'No gratitude entries to copy.';
		}

		let formattedText = 'I am grateful for:\n';

		history.forEach((entry) => {
			const date = new Date(entry.date).toLocaleString();
			formattedText += `\nDate: ${date}\n`;

			entry.items.forEach((item) => {
				formattedText += `${item.gratitudeNumber}. ${item.gratitude}\n`;
			});
		});

		return formattedText;
	};

	const copyGratitudesToClipboard = () => {
		const textToCopy = formatGratitudesForClipboard();
		navigator.clipboard.writeText(textToCopy).then(
			() => {
				console.log('Current gratitudes copied to clipboard successfully.');
				// Toastify
			},
			(err) => {
				console.error('Could not copy text: ', err);
				// Toastify
			}
		);
	};

	return (
		<div className="gratitude-list-container">
			{authenticated && <button onClick={toggleModal}>View History</button>}
			<button onClick={copyGratitudesToClipboard}>
				Copy Gratitudes to Clipboard
			</button>
			<GratitudeHistoryModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				history={history}
			/>
			<h2>Gratitude List</h2>
			<form>
				{items.map((item, index) => (
					<div key={index} className="gratitude-item">
						<span className="gratitude-item-number">{index + 1}.</span>
						<input
							type="text"
							value={item}
							onChange={(e) => handleItemChange(index, e.target.value)}
							placeholder="Enter your gratitude item"
						/>
						{index > 0 && (
							<button
								type="button"
								className="gratitude-remove-item"
								onClick={() => handleRemoveItem(index)}
							>
								X
							</button>
						)}
					</div>
				))}
				{items.length < 10 && (
					<button
						type="button"
						className="gratitude-add-gratitude"
						onClick={handleAddItem}
					>
						Add Item
					</button>
				)}
				{authenticated && (
					<button
						type="button"
						className="gratitude-save-button"
						onClick={handleSave}
					>
						Save
					</button>
				)}
			</form>
		</div>
	);
};

export default GratitudeList;
