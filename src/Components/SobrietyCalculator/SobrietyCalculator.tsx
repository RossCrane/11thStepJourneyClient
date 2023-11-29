import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles.css';
import { getSoberDate, saveSoberDate } from '../../Services/SoberDateService';

interface ISobrietyCalculatorProps {
	onDateChange?: (newDate: string) => void;
}

const SobrietyCalculator: React.FC<ISobrietyCalculatorProps> = ({
	onDateChange,
}) => {
	const [currentTime, setCurrentTime] = useState(moment());
	const [inputDate, setInputDate] = useState<string>('1935-06-10');

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(moment());
		}, 1000);

		const fetchSoberDate = async () => {
			try {
				const fetchedDate = await getSoberDate();
				if (fetchedDate) {
					setInputDate(fetchedDate);
				}
			} catch (error) {
				console.error('Error fetching sober date:', error);
			}
		};

		fetchSoberDate();

		return () => clearInterval(interval);
	}, []);

	const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value;
		setInputDate(newDate);
		if (onDateChange) {
			onDateChange(newDate); // Notify the parent component of the date change
		}
	};

	const handleSaveDate = async () => {
		try {
			if (inputDate) {
				const response = await saveSoberDate(inputDate);
				console.log('Sober date saved:', response);
				// You can add more logic here if needed, like notifying the user of success
			} else {
				// Handle case where no date is selected
				console.error('No date selected');
			}
		} catch (error) {
			console.error('Error saving sober date:', error);
			// Handle errors, possibly show an error message to the user
		}
	};

	// Parse the input date using moment.js
	const startDate = inputDate ? moment(inputDate) : null;
	const timeDifference = startDate
		? moment.duration(currentTime.diff(startDate))
		: null;

	return (
		<div className="sobriety-calculator-container">
			<h1>Set Your Sobriety Date:</h1>
			<input
				className="sobriety-calculator-input"
				type="date"
				value={inputDate}
				onChange={handleChangeDate}
				placeholder="YYYY-MM-DD"
			/>
			<button className="save-date-button" onClick={handleSaveDate}>
				Save Date
			</button>
			<h2>
				{inputDate === '1935-06-10'
					? 'AA has been around for:'
					: 'You have been sober for:'}
			</h2>
			{timeDifference ? (
				<>
					<p className="total-sober-time">
						<span className="sober-time-value">{timeDifference.years()}</span>{' '}
						years,{' '}
						<span className="sober-time-value">{timeDifference.months()}</span>{' '}
						months,{' '}
						<span className="sober-time-value">{timeDifference.days()}</span>{' '}
						days
					</p>
					<p className="total-days-sober">
						Total Days Sober: {Math.floor(timeDifference.asDays())}{' '}
					</p>
					<p className="total-hours-sober">
						Total Hours Sober: {Math.floor(timeDifference.asHours())}{' '}
					</p>
				</>
			) : null}
		</div>
	);
};

export default SobrietyCalculator;
