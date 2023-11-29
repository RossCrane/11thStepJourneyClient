import React, { useState } from 'react';
import { createGratitudeEntry } from '../../Services/GratitudeService';
import './Styles.css';

interface IGratitudeListProps {
	onSave: (items: string[]) => void; // Assuming this is for post-save actions
}

const GratitudeList: React.FC<IGratitudeListProps> = ({ onSave }) => {
	const [items, setItems] = useState<string[]>(['']);

	const handleItemChange = (index: number, newValue: string) => {
		const newItems = [...items];
		newItems[index] = newValue;
		setItems(newItems);
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
		const filteredItems = items.filter((item) => item.trim() !== '');
		try {
			const userId = 'your-user-id'; // Replace with actual user ID
			const savedEntry = await createGratitudeEntry(userId, filteredItems);
			console.log('Gratitude Entry Saved:', savedEntry);
			onSave(filteredItems); // Call onSave prop function, if needed
		} catch (error) {
			console.error('Error saving gratitude entry:', error);
			// Handle save error
		}
	};

	return (
		<div className="gratitude-list-container">
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
				<button
					type="button"
					className="gratitude-save-button"
					onClick={handleSave}
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default GratitudeList;
