import React, { useState ,useEffect} from 'react';
import authService from './appwrite/authService';
import './Login.css' ;
import { Link,useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await authService.login({ email, password });
      console.log('User logged in successfully', loginResponse);
    setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  if(isLoggedIn){
      setTimeout(() => navigate('/Sidebar'), 2000); // adjust delay as needed
  }

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
       <Link to = '/Forgot'>Forgot</Link>
          <button className="submit" type="submit">
            Login
          </button>
          <span>Don't have an account?<Link to='/Signup'>Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
