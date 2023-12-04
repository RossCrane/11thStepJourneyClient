import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Context/AuthContext';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
import { elevenQuestionsTemplate } from './Utils/ElevenQuestionsTemplate';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import Prayers from './Components/Prayers/Prayers';
import UponAwakening from './Components/UponAwakening/UponAwakening';
import SobrietyCalculator from './Components/SobrietyCalculator/SobrietyCalculator';
import GratitudeList from './Components/GratitudeList/GratitudeList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Context/AuthContext';

// import NotificationModal from './Components/NotificationModal/NotificationModal';

const handleStepFormSubmit = (formData: any) => {
	// console.log(formData, 'form data here after submission');
};

const App: React.FC = () => {
	const { authenticated } = useAuth();
	const [userSobrietyDate, setUserSobrietyDate] = useState<string | null>(null);

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

	const onSave = (formData: any) => {
		// Implement the logic to save the form data to the backend
		console.log(formData);
	};
	return (
		// <AuthProvider>
		<div className="outer-container">
			<Header />
			<ToastContainer />
			<div className="inner-content-container">
				<Routes>
					<Route
						path="/"
						element={
							<ElevenQuestionsForm
								handleStepFormSubmit={handleStepFormSubmit}
								steps={elevenQuestionsTemplate}
							/>
						}
					/>
					<Route path="/login" element={<LoginRegister />} />
					{/* Should be a protected route */}
					<Route
						path="/account"
						element={
							authenticated ? (
								<ProfileForm profileData={profileData} onSave={onSave} />
							) : (
								<LoginRegister />
							)
						}
					/>
					<Route path="/prayers" element={<Prayers />} />
					<Route path="/uponawakening" element={<UponAwakening />} />
					<Route path="/sobrietycalculator" element={<SobrietyCalculator />} />
					<Route
						path="/creategratitude"
						element={<GratitudeList />}
						// onSave={handleGratitudeSave}
					/>
				</Routes>
			</div>
			<Footer />
		</div>
		// </AuthProvider>
	);
};

export default App;

// For NotificationModal

/* <NotificationModal
					isOpen={true}
					onClose={() => console.log('close')}
					announcements={['Announcement 1', 'Announcement 2']}
				/> */
