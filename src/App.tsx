import './App.css';
import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
import { elevenQustionsTemplate } from './Utils/ElevenQuestionsTemplate';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import LoginRegister from './Components/LoginRegister/LoginRegister';

const handleStepFormSubmit = (formData: any) => {
	console.log(formData, 'form data here after submission');
};

function App() {
	return (
		<div className="outer-container">
			<Header />
			<div className="inner-content-container">
				{/* <ElevenQuestionsForm
					handleStepFormSubmit={handleStepFormSubmit}
					steps={elevenQustionsTemplate}
				/> */}
				<LoginRegister />
			</div>
			<Footer />
		</div>
	);
}

export default App;
