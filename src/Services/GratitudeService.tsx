import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface GratitudeItem {
	gratitudeNumber: number;
	gratitude: string;
}

interface GratitudeHistoryResponse {
	success: boolean;
	data: GratitudeHistoryEntry[];
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

const createGratitudeEntry = async (items: GratitudeItem[]) => {
	// console.log('createGratitudeEntry', items);
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/gratitude`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ items }),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Could not create gratitude entry');
	}
	return data;
};

const fetchGratitudeHistory = async (): Promise<GratitudeHistoryResponse> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/gratitude`, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	// console.log('data', data);
	if (!response.ok) {
		throw new Error(data.message || 'Could not fetch gratitude history');
	}

	return data;
};

export { fetchGratitudeHistory, createGratitudeEntry };
