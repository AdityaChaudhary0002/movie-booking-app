import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const navigate = useNavigate();

    const handleSignup = () => {
        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            setError('Please fill in all fields.');
            return;
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Basic password policy validation
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter.');
            return;
        }
        if (!/[0-9]/.test(password)) {
            setError('Password must contain at least one number.');
            return;
        }
        if (!/[!@#$%^&*]/.test(password)) {
            setError('Password must contain at least one special character.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Store user data in local storage
        const userData = { email, password }; // In a real app, hash the password!
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
    };

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields.');
            return;
        }

        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            navigate('/'); // Navigate to the home page
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-form">
                    <h1>MovieNest</h1>
                    <div className="form-tabs">
                        <div 
                            className={`tab ${isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(true)}
                        >
                            Log In
                        </div>
                        <div 
                            className={`tab ${!isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </div>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                        required
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="input-field"
                            required
                        />
                    )}
                    <button onClick={isLogin ? handleLogin : handleSignup} className="signup-button">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default Login;
