// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

export const saveSoberDate = async (soberDate: string): Promise<any> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/soberDate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ soberDate }),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Could not save sober date');
	}

	return data;
};

//export default saveSoberDate;

// In your ApiService.ts

export const getSoberDate = async (): Promise<string | null> => {
	const token = localStorage.getItem('token');
	if (!token) {
		return null; // No user is logged in
	}

	const response = await fetch(`${BASE_URL}/path-to-get-sober-date`, {
		// Replace with your actual endpoint
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch sober date');
	}

	const data = await response.json();
	return data.soberDate; // Ensure this matches the structure of your response
};

// export default getSoberDate;
