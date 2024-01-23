import React, { useState } from 'react';
import authService from './appwrite/authService';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.createAccount({email, password, name});
      toast.success('Successful Registration!')
      console.log('User registered successfully', response);
      navigate('/')
     
    } catch (error) {
      console.error('Registration failed', error);
      if(error.code===409){
        toast.error("User already exists.")
      }
      else if( error.code===400){
        toast.error('Invalid input format');
      }
      else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="loginLayout">
    < div className='login'>
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
      <div className="form">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit" className='signbutton'>Signup</button></div>
      </form>
      <ToastContainer/>
    </div>
    </div>
  );
};

export default Signup;
