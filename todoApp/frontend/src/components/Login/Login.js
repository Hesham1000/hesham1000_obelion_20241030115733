import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/register', {
        email,
        password,
        confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setIsRegistered(true);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setErrorMessage('');
        // Redirect to dashboard or handle successful login
      }
    } catch (error) {
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistered ? 'Login' : 'Register'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      {!isRegistered && (
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
      )}
      {isRegistered ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}
    </div>
  );
}

export default Login;
