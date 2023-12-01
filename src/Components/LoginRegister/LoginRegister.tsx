import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiServiceJWT from '../../Services/AuthenticationService';
import { useAuth } from '../../Context/AuthContext';
import './Styles.css';
import { toast } from 'react-toastify';

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
	token?: string;
}

function LoginRegister() {
	const navigate = useNavigate();
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

	const auth = useAuth();

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

	const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await apiServiceJWT.login({
				email: loginForm.loginEmail,
				password: loginForm.loginPassword,
			});
			console.log(response);
			auth.login(response.token, () => {
				// console.log('Logged in successfully');
				navigate('/');
				toast.success('Logged in successfully');
			});
		} catch (error) {
			// console.error('Login failed:', error);
			// Change error to error.message if this looks bad the fix TS error
			toast.error('Login failed: ' + error);
		}
		// console.log('Login form submitted:', loginForm);
	};

	const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateEmail(registerForm.registerEmail)) {
			setRegisterForm({
				...registerForm,
				emailError: 'Invalid email format',
				passwordError: '',
			});
			return;
		}

		if (registerForm.registerPassword !== registerForm.confirmPassword) {
			setRegisterForm({
				...registerForm,
				emailError: '',
				passwordError: 'Passwords do not match',
			});
			return;
		}

		try {
			const response = await apiServiceJWT.register({
				email: registerForm.registerEmail,
				password: registerForm.registerPassword,
			});
			if (response.token) {
				auth.login(response.token, () => {
					// console.log('Registered and logged in successfully');
					toast.success('Registered and logged in successfully');
					navigate('/');
				});
			} else {
				toast.error('Registration failed: Token not provided');
			}
		} catch (error) {
			// console.error('Registration failed:', error);
			// Change error to error.message if this looks bad the fix TS error
			toast.error('Registration failed: ' + error);
		}
		// console.log('Register form submitted:', registerForm);
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
				{/* add toastify here */}
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
