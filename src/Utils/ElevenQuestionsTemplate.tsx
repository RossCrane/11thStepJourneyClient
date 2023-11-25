export interface Question {
	id: number;
	question: string;
	// Add type annotations for response and checkboxes if needed
	// response?: string | boolean;
	// checkboxes?: string[] | boolean[];
}

export const elevenQustionsTemplate: Question[] = [
	{
		id: 0,
		question: `Was I resentful today?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 1`,
	},
	{
		id: 1,
		question: `Was I selfish today?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 2`,
	},
	{
		id: 2,
		question: `Was I dishonest today?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 3`,
	},
	{
		id: 3,
		question: `Was I afraid today?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 4`,
	},
	{
		id: 4,
		question: `Do I owe an apology?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 5`,
		// in the futerure add a reminder in the morning to make the apology (stretch goal)
	},
	{
		id: 5,
		question: `Have I kept something to myself which should be discussed with another person at once?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 6`,
	},
	{
		id: 6,
		question: `Was I kind and loving toward all?`,
		// checkboxes: ['Yes', 'No'] save as a boolean Stretch goal,
		// response: `Variable to store response 7`,
	},
	{
		id: 7,
		question: `What could I have done better?`,
		// response: `Variable to store response 8`,
	},
	{
		id: 8,
		question: `Was I thinking of myself most of the time?`,
		// response: `Variable to store response 9`,
	},
	{
		id: 9,
		question: `Did I think of what I could do for others?`,
		// response: `Variable to store response 10`,
	},
	{
		id: 10,
		question: `What could I pack into the stream of life?`,
		// response: `Variable to store response 11`,
	},
];
