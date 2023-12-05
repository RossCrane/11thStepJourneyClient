export const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

export const postRequest = async (url: string, body: any) => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}${url}`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const data = await response.json();
	if (!response.ok) {
		let message = data.message;

		if (data?.message) {
			message = data.message;
		} else {
			message = data;
		}

		return { error: true, message };
	}
	return data;
};

// export const postRequest = async (url: string, body: any) => {
// 	const token = localStorage.getItem('token');
// 	if (!token) {
// 		throw new Error('No authorization token found');
// 	}

// 	const response = await fetch(`${BASE_URL}${url}`, {
// 		method: 'POST',
// 		credentials: 'include',
// 		mode: 'cors',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 		body: JSON.stringify(body),
// 	});

// 	let data;
// 	try {
// 		data = await response.json();
// 	} catch (error) {
// 		console.error('Error parsing JSON:', error);
// 		// Optionally, log the raw response if JSON parsing fails
// 		const rawResponse = await response.text();
// 		console.log('Raw response:', rawResponse);

// 		// You can return an error or throw it, depending on how you want to handle it
// 		return { error: true, message: 'Failed to parse JSON response' };
// 	}

// 	if (!response.ok) {
// 		let message = data.message;

// 		if (data?.message) {
// 			message = data.message;
// 		} else {
// 			message = data;
// 		}

// 		return { error: true, message };
// 	}
// 	return data;
// };

export const getRequest = async (url: string) => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		let message = `Error: ${response.status}`;

		if (data?.message) {
			message = data.message;
		}

		return { error: true, message };
	}
	return data;
};
