// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

// this is not working and I have not figured out why yet. has to do with authentication.
const createGratitudeEntry = async (userId: string, items: string[]) => {
	console.log('createGratitudeEntry', userId, items);
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
		body: JSON.stringify({ userId, items }),
	});
	const data = await response.json();
	console.log('data', data);
	if (!response.ok) {
		throw new Error(data.message || 'Could not create gratitude entry');
	}
	return data;
};

export { createGratitudeEntry };
