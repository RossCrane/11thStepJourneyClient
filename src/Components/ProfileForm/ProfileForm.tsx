import React, { useState, useEffect } from 'react';
import './Styles.css';
import {
	getUserProfile,
	updateUserProfile,
} from '../../Services/ProfileService';
import { toast } from 'react-toastify';

interface IProfileForm {
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	isAnonymous: boolean;
	state?: string;
	city?: string;
	homeGroup?: string;
	programs: {
		AA: boolean;
		CA: boolean;
		NA: boolean;
	};
}

interface IProfileProps {
	profileData: IProfileForm;
	onSave: (formData: IProfileForm) => void;
}

const ProfileForm: React.FC<IProfileProps> = ({ onSave }) => {
	const defaultProfileData = {
		isAnonymous: false,
		programs: { AA: false, CA: false, NA: false },
	};

	const [formData, setFormData] = useState<IProfileForm>(defaultProfileData);
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await getUserProfile();
				if (response.success && response.data) {
					const userProfileData = response.data;
					const transformedProfileData = {
						firstName: userProfileData.firstName,
						lastName: userProfileData.lastName,
						email: userProfileData.email,
						phoneNumber: userProfileData.phone,
						isAnonymous:
							userProfileData.anonymousFlag !== undefined
								? userProfileData.anonymousFlag
								: false,
						state: userProfileData.state,
						city: userProfileData.city,
						homeGroup: userProfileData.homeGroup,
						programs: {
							AA: userProfileData.aaFlag || false,
							CA: userProfileData.caFlag || false,
							NA: userProfileData.naFlag || false,
						},
					};
					setFormData(transformedProfileData);
				}
			} catch (error) {
				toast.error('Error fetching user profile.');
			}
		};

		fetchUserProfile();
	}, []);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			programs: {
				...prevData.programs,
				[name]: checked,
			},
		}));
	};

	const handleSave = async () => {
		try {
			const formattedData = {
				...formData,
				aaFlag: formData.programs?.AA || false,
				caFlag: formData.programs?.CA || false,
				naFlag: formData.programs?.NA || false,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phoneNumber: formData.phoneNumber,
				isAnonymous: formData.isAnonymous,
				state: formData.state,
				city: formData.city,
				homeGroup: formData.homeGroup,
			};

			await updateUserProfile(formattedData);
			toast.success('Profile updated successfully');
			onSave(formattedData);
		} catch (error) {
			toast.error('Error updating profile.');
		}
	};

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	const renderPrograms = () => {
		return (
			Object.entries(formData.programs || {})
				.filter(([_, value]) => value)
				.map(([key, _]) => key)
				.join(', ') || 'Not enrolled in any programs'
		);
	};

	const renderForm = () => {
		if (isEditMode) {
			return (
				<div className="profile-form-container">
					<h2>Edit Profile</h2>
					<form>
						<div className="form-group">
							<label htmlFor="firstName">First Name (optional):</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Last Name (optional):</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="phoneNumber">Phone Number (optional):</label>
							<input
								type="text"
								id="phoneNumber"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label>
								<input
									type="checkbox"
									name="isAnonymous"
									checked={formData.isAnonymous}
									onChange={handleInputChange}
									className="form-checkbox"
								/>
								Do you want to be anonymous?
							</label>
						</div>
						{formData.isAnonymous && (
							<p className="anonymous-note">
								This will make you anonymous to other users.
							</p>
						)}
						<div className="form-group">
							<label htmlFor="state">State (optional):</label>
							<input
								type="text"
								id="state"
								name="state"
								value={formData.state}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="city">City (optional):</label>
							<input
								type="text"
								id="city"
								name="city"
								value={formData.city}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="homeGroup">Home Group (optional):</label>
							<input
								type="text"
								id="homeGroup"
								name="homeGroup"
								value={formData.homeGroup}
								onChange={handleInputChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<p>What 12 step programs do you belong to?</p>
							<label>
								<input
									type="checkbox"
									name="AA"
									checked={formData.programs.AA}
									onChange={handleProgramChange}
								/>
								AA
							</label>
							<label>
								<input
									type="checkbox"
									name="CA"
									checked={formData.programs.CA}
									onChange={handleProgramChange}
								/>
								CA
							</label>
							<label>
								<input
									type="checkbox"
									name="NA"
									checked={formData.programs.NA}
									onChange={handleProgramChange}
								/>
								NA
							</label>
						</div>
						<div className="form-group">
							<button type="button" onClick={handleSave} className="btn-save">
								Save
							</button>
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<p>First Name: {formData.firstName || 'Not provided'}</p>
					<p>Last Name: {formData.lastName || 'Not provided'}</p>
					<p>Email: {formData.email || 'Not provided'}</p>
					<p>Phone Number: {formData.phoneNumber || 'Not provided'}</p>
					<p>Anonymous: {formData.isAnonymous ? 'Yes' : 'No'}</p>
					<p>State: {formData.state || 'Not provided'}</p>
					<p>City: {formData.city || 'Not provided'}</p>
					<p>Home Group: {formData.homeGroup || 'Not provided'}</p>
					<p>Programs: {renderPrograms()}</p>
					<button onClick={toggleEditMode}>Edit Profile</button>
				</div>
			);
		}
	};

	return (
		<div className="profile-form-container">
			<h2>{isEditMode ? 'Edit Profile' : 'Profile'}</h2>
			{renderForm()}
		</div>
	);
};

export default ProfileForm;
