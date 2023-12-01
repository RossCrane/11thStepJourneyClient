// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface QuestionResponse {
	questionNumber: number;
	response: string;
	_id: string;
}

interface ElevenQuestionsHistoryEntry {
	responsesToResponse: any[];
	_id: string;
	userId: string;
	responses: QuestionResponse[];
	date: string;
	__v: number; // Version key, if not needed, can be omitted
}

interface ElevenQuestionsHistoryResponse {
	success: boolean;
	data: ElevenQuestionsHistoryEntry[];
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

export const fetchElevenQuestionsHistory =
	async (): Promise<ElevenQuestionsHistoryResponse> => {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authorization token found');
		}

		const response = await fetch(`${BASE_URL}/response`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data: ElevenQuestionsHistoryResponse = await response.json();

		if (!response.ok) {
			throw new Error('Failed to fetch question responses history');
		}

		return data;
	};
