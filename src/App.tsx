import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
import { elevenQustionsTemplate } from './Utils/ElevenQuestionsTemplate';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import Prayers from './Components/Prayers/Prayers';
import UponAwakening from './Components/UponAwakening/UponAwakening';
import SobrietyCalculator from './Components/SobrietyCalculator/SobrietyCalculator';
import GratitudeList from './Components/GratitudeList/GratitudeList';
// import NotificationModal from './Components/NotificationModal/NotificationModal';

// For eleven questions form
const handleStepFormSubmit = (formData: any) => {
	console.log(formData, 'form data here after submission');
};

// for profile form
const App: React.FC = () => {
	// For sobriety calculator
	const [userSobrietyDate, setUserSobrietyDate] = useState<string | null>(null);

	//	Define the profileData and onSave function
	const profileData = {
		firstName: '',
		lastName: '',
		phoneNumber: '',
		isAnonymous: false,
		state: '',
		city: '',
		homeGroup: '',
		programs: {
			AA: false,
			CA: false,
			NA: false,
		},
	};

	//for profile form
	const onSave = (formData: any) => {
		// Implement the logic to save the form data to the backend
		console.log(formData);
	};
	return (
		<div className="outer-container">
			<Header />
			<div className="inner-content-container">
				<Routes>
					<Route
						path="/"
						element={
							<ElevenQuestionsForm
								handleStepFormSubmit={handleStepFormSubmit}
								steps={elevenQustionsTemplate}
							/>
						}
					/>
					<Route path="/login" element={<LoginRegister />} />
					{/* Should be a protected route */}
					<Route
						path="/account"
						element={<ProfileForm profileData={profileData} onSave={onSave} />}
					/>
					<Route path="/prayers" element={<Prayers />} />
					<Route path="/uponawakening" element={<UponAwakening />} />
					<Route path="/sobrietycalculator" element={<SobrietyCalculator />} />
					<Route path="/creategratitude" element={<GratitudeList />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default App;

// For NotificationModal

/* <NotificationModal
					isOpen={true}
					onClose={() => console.log('close')}
					announcements={['Announcement 1', 'Announcement 2']}
				/> */
