import React, { useState ,useEffect} from 'react';
import authService from './appwrite/authService';
import './Login.css' ;
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

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
      toast.success('Login successful!');
    setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error);
      if (error.code===401) {
        toast.error('Invalid credentials.Please check your email and password'); 
      } else if( error.code===400){
        toast.error('Password must be of 8 charachters');
      }
      else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  
  };
  if(isLoggedIn){
      setTimeout(() => navigate('/Sidebar'), 2000); // adjust delay as needed
  }
 
  return (
      <div className="loginLayout">
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
       <Link to = '/Forgot' className='forpass'>Forgot Password</Link>
          <button className="submit" type="submit">
            Login
          </button>
          <span>Don't have an account?<Link to='/Signup'>Signup</Link></span>
        </form>
      </div>
      </div>
      <ToastContainer/>
    </div>
  );
;}

export default Login;
