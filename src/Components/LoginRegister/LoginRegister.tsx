import React, { useState } from 'react';
import './Styles.css';

interface LoginForm {
	loginEmail: string;
	loginPassword: string;
}

interface RegisterForm {
	registerEmail: string;
	registerPassword: string;
	confirmPassword: string;
	emailError: string;
	passwordError: string;
}

function LoginRegister() {
	const [loginForm, setLoginForm] = useState<LoginForm>({
		loginEmail: '',
		loginPassword: '',
	});

	const [registerForm, setRegisterForm] = useState<RegisterForm>({
		registerEmail: '',
		registerPassword: '',
		confirmPassword: '',
		emailError: '',
		passwordError: '',
	});

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginForm({
			...loginForm,
			[name]: value,
		});
	};

	const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegisterForm({
			...registerForm,
			[name]: value,
		});
	};

	const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Add your login logic here
		console.log('Login form submitted:', loginForm);
	};

	const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Email validation
		if (!validateEmail(registerForm.registerEmail)) {
			setRegisterForm({
				...registerForm,
				emailError: 'Invalid email format',
				passwordError: '', // Clear any previous password error
			});
			return;
		}

		// Password confirmation validation
		if (registerForm.registerPassword !== registerForm.confirmPassword) {
			setRegisterForm({
				...registerForm,
				emailError: '', // Clear any previous email error
				passwordError: 'Passwords do not match',
			});
			return;
		}

		// Add your register logic here
		console.log('Register form submitted:', registerForm);
	};

	const validateEmail = (email: string) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	return (
		<div className="login-register-container">
			<form className="register-form" onSubmit={handleRegisterSubmit}>
				<h1>Register</h1>
				<input
					type="email"
					name="registerEmail"
					placeholder="Email"
					value={registerForm.registerEmail}
					onChange={handleRegisterChange}
					required
				/>
				{registerForm.emailError && (
					<p className="error">{registerForm.emailError}</p>
				)}
				<input
					type="password"
					name="registerPassword"
					placeholder="Password"
					value={registerForm.registerPassword}
					onChange={handleRegisterChange}
					required
				/>
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					value={registerForm.confirmPassword}
					onChange={handleRegisterChange}
					required
				/>
				{registerForm.passwordError && (
					<p className="error">{registerForm.passwordError}</p>
				)}
				<button className="register-button" type="submit">
					Register
				</button>
			</form>
			<form className="login-form" onSubmit={handleLoginSubmit}>
				<h1>Login</h1>
				<input
					type="email"
					name="loginEmail"
					placeholder="Email"
					value={loginForm.loginEmail}
					onChange={handleLoginChange}
					required
				/>
				<input
					type="password"
					name="loginPassword"
					placeholder="Password"
					value={loginForm.loginPassword}
					onChange={handleLoginChange}
					required
				/>
				<button className="login-button" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}

export default LoginRegister;
