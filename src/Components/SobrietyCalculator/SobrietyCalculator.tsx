import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Styles.css';
import { getSoberDate, saveSoberDate } from '../../Services/SoberDateService';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

interface ISobrietyCalculatorProps {
	onDateChange?: (newDate: string) => void;
}

const SobrietyCalculator: React.FC<ISobrietyCalculatorProps> = ({
	onDateChange,
}) => {
	const [currentTime, setCurrentTime] = useState(moment());
	const [inputDate, setInputDate] = useState<string>('1935-06-10');
	const { authenticated } = useAuth();

	useEffect(() => {
		setCurrentTime(moment());

		const fetchSoberDate = async () => {
			try {
				const fetchedDate = await getSoberDate();
				if (fetchedDate) {
					const formattedDate = moment.utc(fetchedDate).format('YYYY-MM-DD');
					setInputDate(formattedDate);
				}
			} catch (error) {
				toast.error('Error fetching sober date.');
				console.error('Error fetching sober date:', error);
			}
		};

		fetchSoberDate();
	}, []);

	const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value;
		setInputDate(newDate);
		if (onDateChange) {
			onDateChange(newDate);
		}
	};

	const handleSaveDate = async () => {
		try {
			if (inputDate) {
				const response = await saveSoberDate(inputDate);
				toast.success('Sober date saved successfully!');
			} else {
				toast.error('No date selected.');
			}
		} catch (error) {
			toast.error('Error saving sober date.');
			console.error('Error saving sober date:', error);
		}
	};

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
			{authenticated && (
				<button className="save-date-button" onClick={handleSaveDate}>
					Save Date
				</button>
			)}
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
