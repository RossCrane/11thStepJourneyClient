import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
	authenticated: boolean;
	login: (token: string, cb: () => void) => void;
	logout: (cb: () => void) => void;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authenticated, setAuthenticated] = useState(false);

	const login = (token: string, cb: () => void) => {
		localStorage.setItem('token', token);
		setAuthenticated(true);
		cb();
	};

	const logout = (cb: () => void) => {
		localStorage.removeItem('token');
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
	return context;
};
