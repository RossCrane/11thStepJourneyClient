import './App.css';
// import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
// import { elevenQustionsTemplate } from './Utils/ElevenQuestionsTemplate';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
// import LoginRegister from './Components/LoginRegister/LoginRegister';
// import ProfileForm from './Components/ProfileForm/ProfileForm';
// import Prayers from './Components/Prayers/Prayers';
import UponAwakening from './Components/UponAwakening/UponAwakening';

// For eleven questions form
// const handleStepFormSubmit = (formData: any) => {
// 	console.log(formData, 'form data here after submission');
// };

// for profile form
const App: React.FC = () => {
	// Define the profileData and onSave function
	// const profileData = {
	// 	firstName: '',
	// 	lastName: '',
	// 	phoneNumber: '',
	// 	isAnonymous: false,
	// 	state: '',
	// 	city: '',
	// 	homeGroup: '',
	// 	programs: {
	// 		AA: false,
	// 		CA: false,
	// 		NA: false,
	// 	},
	// };

	// for profile form
	// const onSave = (formData: any) => {
	// 	// Implement the logic to save the form data to the backend
	// 	console.log(formData);
	// };
	return (
		<div className="outer-container">
			<Header />
			<div className="inner-content-container">
				{/* <ElevenQuestionsForm
					handleStepFormSubmit={handleStepFormSubmit}
					steps={elevenQustionsTemplate}
				/> */}
				{/* <LoginRegister /> */}
				{/* <ProfileForm profileData={profileData} onSave={onSave} /> */}
				{/* <Prayers /> */}
				<UponAwakening />
			</div>
			<Footer />
		</div>
	);
};

export default App;
