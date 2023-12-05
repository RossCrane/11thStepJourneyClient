import React, { createContext, useContext, useEffect, useState } from 'react';
import apiServiceJWT from '../Services/AuthenticationService';

interface User {
	id: string;
	email: string;
}

interface AuthContextType {
	authenticated: boolean;
	// new line
	user: User | null;
	login: (token: string, user: User, cb: () => void) => void;
	logout: (cb: () => void) => void;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	//console.log('user', user);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const accessToken = localStorage.getItem('token');
				if (accessToken) {
					const user = await apiServiceJWT.profile(accessToken);
					setUser(user);
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
					setUser(null);
				}
			} catch (error) {
				console.error('Authentication check failed:', error);
				setAuthenticated(false);
				setUser(null);
				localStorage.removeItem('token');
			}
		};

		checkAuthentication();
	}, []);

	const login = (token: string, user: User, cb: () => void) => {
		localStorage.setItem('token', token);
		// new line
		setUser(user);
		setAuthenticated(true);
		cb();
	};

	const logout = (cb: () => void) => {
		localStorage.removeItem('token');
		// new line
		setUser(null);
		setAuthenticated(false);
		cb();
	};

	// added user to the value
	return (
		<AuthContext.Provider
			value={{ authenticated, user, login, logout, setAuthenticated }}
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
