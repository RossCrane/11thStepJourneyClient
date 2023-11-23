import React, { createContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyContextProvider = ({ children }) => {
	const [data, setData] = useState(null);

	// Define any functions or state variables you want to share

	return (
		<MyContext.Provider value={{ data, setData }}>
			{children}
		</MyContext.Provider>
	);
};
