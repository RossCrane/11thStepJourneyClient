import awakening from '../assets/awakening.svg';
import prayer from '../assets/prayers.svg';
import calculator from '../assets/calculator.svg';
import gratitude from '../assets/gratitude.svg';

interface INavLinks {
	id: number;
	to: string;
	icon: string; // could be File or HTMLImageElement
	text: string;
}
export const links: INavLinks[] = [
	{ id: 1, to: '/uponawakening', icon: awakening, text: 'Upon Awakening' },
	{ id: 2, to: '/prayers', icon: prayer, text: 'Prayers' },
	{
		id: 3,
		to: '/sobrietycalculator',
		icon: calculator,
		text: 'Sober Calculator',
	},
	{
		id: 4,
		to: '/creategratitude',
		icon: gratitude,
		text: 'Create Gratitude List',
	},
	//{ id: 5, to: '/contact', icon: 'envelope', text: 'Contact' },
];
