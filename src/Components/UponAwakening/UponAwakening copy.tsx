import { uponAwakeningData } from '../../Utils/UponAwakenigData';
import './Styles.css';

const UponAwakening = () => {
	return (
		<div>
			<h1 className="upon-awakening-title">{uponAwakeningData[0].intro}</h1>
			{uponAwakeningData[0].text.split('\n').map((paragraph, index) => (
				<p className="upon-awakening-text" key={index}>
					{paragraph}
				</p>
			))}
		</div>
	);
};

export default UponAwakening;
