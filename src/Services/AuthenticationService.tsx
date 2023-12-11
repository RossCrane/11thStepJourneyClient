import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface RegisterResponse {
	token: string;
}

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
			toast.error('Error registering user.');
			console.error('Registration error:', error);
			throw error;
		}
	},

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
			toast.error('Error logging in user.');
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
			toast.error('Error fetching user profile.');
			console.log(error);
		}
	},

	logout: (tokenName: string) => {
		localStorage.removeItem(tokenName);
	},
};

export default apiServiceJWT;
