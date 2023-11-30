// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

export const submitQuestionResponses = async (
	responses: any[]
): Promise<any> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/response`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ responses }),
	});

	if (!response.ok) {
		const errorResponse = await response.json();
		throw new Error(errorResponse.message || 'Failed to submit responses');
	}

	return response.json();
};

export const fetchElevenQuestionsHistory = async (): Promise<any[]> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/path-to-fetch-history`, {
		// Update with your actual endpoint
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch question responses history');
	}

	return response.json();
};
