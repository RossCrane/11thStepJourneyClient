import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles.css';

interface ISobrietyCalculatorProps {
	onDateChange?: (newDate: string) => void;
}

const SobrietyCalculator: React.FC<ISobrietyCalculatorProps> = ({
	// inputDate,
	onDateChange,
}) => {
	const [currentTime, setCurrentTime] = useState(moment());
	const [inputDate, setInputDate] = useState<string>(''); // State to store the input date

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(moment());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value;
		setInputDate(newDate); // Update the input date state
		if (onDateChange) {
			onDateChange(newDate); // Notify the parent component of the date change
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
			<h2>You Have Been Sober For:</h2>
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
