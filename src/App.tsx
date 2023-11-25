import './App.css';
import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
import { elevenQustionsTemplate } from './Utils/11Questions';

const handleStepFormSubmit = (formData: any) => {
	console.log(formData, 'form data here after submission');
};

function App() {
	return (
		<ElevenQuestionsForm
			handleStepFormSubmit={handleStepFormSubmit}
			steps={elevenQustionsTemplate}
		/>
	);
}

export default App;
