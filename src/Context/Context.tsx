// Can likely delete this component

import React, { createContext, useState, ReactNode } from 'react';

// Define the context data structure
interface MyContextType {
	data: any; // Replace 'any' with the specific type of your data
	setData: React.Dispatch<React.SetStateAction<any>>; // Same here for the type
}

// Create the context with a default value
export const MyContext = createContext<MyContextType | null>(null);

// Define the props for MyContextProvider
interface MyContextProviderProps {
	children: ReactNode;
}

// Create a provider component
export const MyContextProvider: React.FC<MyContextProviderProps> = ({
	children,
}) => {
	const [data, setData] = useState<any>(null); // Replace 'any' with the specific type of your data

	// Define any functions or state variables you want to share

	return (
		<MyContext.Provider value={{ data, setData }}>
			{children}
		</MyContext.Provider>
	);
};
