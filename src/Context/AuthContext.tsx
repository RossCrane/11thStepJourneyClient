import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
	authenticated: boolean;
	login: (token: string, cb: () => void) => void;
	logout: (cb: () => void) => void;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	// setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authenticated, setAuthenticated] = useState(false);

	// I think I need to add a check to see if the user is already logged in

	const login = (token: string, cb: () => void) => {
		// Include token parameter
		// console.log(token);
		localStorage.setItem('token', token); // Store the token
		setAuthenticated(true);
		cb();
	};

	const logout = (cb: () => void) => {
		localStorage.removeItem('token'); // Remove the token
		setAuthenticated(false);
		cb();
	};

	return (
		<AuthContext.Provider
			value={{ authenticated, login, logout, setAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	console.log(context);
	return context;
};
