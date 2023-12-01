// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}

interface IProfileForm {
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	phone?: string;
	isAnonymous: boolean;
	anonymousFlag?: boolean;
	state?: string;
	city?: string;
	homeGroup?: string;
	programs: {
		AA: boolean;
		CA: boolean;
		NA: boolean;
	};
	aaFlag?: boolean;
	caFlag?: boolean;
	naFlag?: boolean;
}

interface UserProfileResponse {
	success: boolean;
	data: IProfileForm;
}

export const getUserProfile = async (): Promise<UserProfileResponse> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/profile`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch user profile');
	}

	return response.json();
};

export const updateUserProfile = async (
	profileData: IProfileForm
): Promise<any> => {
	const token = localStorage.getItem('token');
	if (!token) {
		throw new Error('No authorization token found');
	}

	const response = await fetch(`${BASE_URL}/profile`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(profileData),
	});

	if (!response.ok) {
		throw new Error('Failed to update user profile');
	}

	return response.json();
};
