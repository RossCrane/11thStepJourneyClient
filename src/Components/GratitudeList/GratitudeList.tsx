import React, { useState } from 'react';
import './Styles.css';

interface IGratitudeListProps {
	onSave: (items: string[]) => void;
}

const GratitudeList: React.FC<IGratitudeListProps> = ({ onSave }) => {
	const [items, setItems] = useState<string[]>(['']); // Initialize with an empty item

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

	const handleSave = () => {
		const filteredItems = items.filter((item) => item.trim() !== '');
		onSave(filteredItems);
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
