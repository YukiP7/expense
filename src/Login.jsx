import React, { useState } from 'react';
import authService from './appwrite/authService';
import './Login.css' ;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await authService.login({ email, password });
      console.log('User logged in successfully', loginResponse);
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
      <div className="login">
      <h3>Login</h3>
      <div className="form">
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password</label>
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <button className="submit" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
