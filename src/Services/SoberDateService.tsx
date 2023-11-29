// I like that this lowers the text.

const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
	throw new Error('Missing Server URL');
}
