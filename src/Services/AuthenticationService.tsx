// Handle all authentication requests to the server, Can delete this comment later. Just helps to lower the text I want to look at.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface RegisterResponse {
	token: string;
}

// change any later
const apiServiceJWT = {
	register: async (user: any): Promise<RegisterResponse> => {
		try {
			const response = await fetch(`${BASE_URL}/register`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			});
			if (!response.ok) {
				const body = await response.json();
				throw new Error(
					`Error: ${response.status} - ${body.message || 'Unknown error'}`
				);
			}
			return await response.json();
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	},

	// change any later
	login: async (user: any) => {
		try {
			const response = await fetch(`${BASE_URL}/login`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},

	profile: async (accessToken: string) => {
		try {
			const response = await fetch(`${BASE_URL}/profile`, {
				method: 'PUT',
				credentials: 'include',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},

	logout: (tokenName: string) => {
		localStorage.removeItem(tokenName);
		// the following request should invalidate the token
		// return fetch(`${BASE_URL}/logout`, {
		//   method: 'POST',
		//   credentials: 'include',
		//   mode: 'cors',
		//   headers: {
		//     'Content-Type': 'application/json',
		//     Authorization: `Bearer ${tokenName}`,
		//   },
		// })
		//   .then((res) => res.json())
		//   .catch((err) => console.log(err));
	},
};

export default apiServiceJWT;
