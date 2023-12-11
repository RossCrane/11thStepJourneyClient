import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import Chats from './Components/Chats/Chats';
import { ChatProvider } from './Context/ChatContext';

const handleStepFormSubmit = (formData: any) => {};

const App: React.FC = () => {
	const { authenticated, user } = useAuth();
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
		console.log(formData);
	};
	return (
		<ChatProvider user={user}>
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
						<Route
							path="/chat"
							element={authenticated ? <Chats /> : <LoginRegister />}
						/>
						<Route path="/chat" element={<Chats />} />
						<Route path="/prayers" element={<Prayers />} />
						<Route path="/uponawakening" element={<UponAwakening />} />
						<Route
							path="/sobrietycalculator"
							element={<SobrietyCalculator />}
						/>
						<Route path="/creategratitude" element={<GratitudeList />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</ChatProvider>
	);
};

export default App;
