// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface GratitudeItem {
	gratitudeNumber: number;
	gratitude: string;
}

interface GratitudeHistoryEntry {
	gratitudeNumber: number;
	gratitude: string;
	date: string; // Assuming date is a string
}

// this is not working and I have not figured out why yet. has to do with authentication.
const createGratitudeEntry = async (items: GratitudeItem[]) => {
	console.log('createGratitudeEntry', items);
	const token = localStorage.getItem('token'); // Get the token from local storage
	console.log('token', token);
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
	console.log('data', data);
	if (!response.ok) {
		throw new Error(data.message || 'Could not create gratitude entry');
	}
	return data;
};

// Function to fetch gratitude history
const fetchGratitudeHistory = async (): Promise<GratitudeHistoryEntry[]> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	// come back to this
	const response = await fetch(`${BASE_URL}/gratitude/history`, {
		// Adjust the endpoint as per your backend URL
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Could not fetch gratitude history');
	}

	return data;
};

export { fetchGratitudeHistory, createGratitudeEntry };
