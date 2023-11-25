import './App.css';
import { ElevenQuestionsForm } from './Components/ElevenQuestionsForm/ElevenQuestionsForm';
import { elevenQustionsTemplate } from './Utils/ElevenQuestionsTemplate';
import Header from './Components/Header/Header';

const handleStepFormSubmit = (formData: any) => {
	console.log(formData, 'form data here after submission');
};

function App() {
	return (
		<div className="outer-container">
			<Header />
			<p>When we retire at night we constructively review our day.</p>
			<ElevenQuestionsForm
				handleStepFormSubmit={handleStepFormSubmit}
				steps={elevenQustionsTemplate}
			/>
		</div>
	);
}

export default App;
