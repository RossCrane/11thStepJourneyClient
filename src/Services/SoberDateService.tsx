const BASE_URL = import.meta.env.VITE_SERVER_URL;
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

export const getSoberDate = async (): Promise<string | null> => {
	const token = localStorage.getItem('token');
	if (!token) {
		return null;
	}

	const response = await fetch(`${BASE_URL}/soberDate`, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch sober date');
	}

	const data = await response.json();
	return data.soberDate;
};
