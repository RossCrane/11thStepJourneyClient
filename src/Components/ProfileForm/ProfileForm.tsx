import React, { useState } from 'react';
import './Styles.css';

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

const ProfileForm: React.FC<IProfileProps> = ({ profileData, onSave }) => {
	const [formData, setFormData] = useState<IProfileForm>(profileData);

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

	const handleSave = () => {
		// You can perform any validation or further logic here before saving
		onSave(formData);
	};

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
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						readOnly // Email will be pulled from context or store
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
};

export default ProfileForm;
