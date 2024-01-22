import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/authService';
import Sidebar from './Sidebar/Sidebar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { login, signup } from './store/authSlice.js';
import Transactions from './transcations/Transcation.jsx';
import AuthLayout from './AuthLayout'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Forgot from './Forgot/Forgot.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.userData !== null);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(signup());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleSignupSuccess = () => {
    // Redirect to login after successful registration
    dispatch(signup());
  };

 return(
  <>
  <BrowserRouter>
    <Routes>
  <Route path = "/" element = {<Login/>}/>
  <Route path = "/Signup" element = {<Signup/>}/>
  <Route path = "/Forgot" element = {<Forgot/>}/>
  <Route path = "/Sidebar" element = {<Sidebar/>}/>
    </Routes>
  </BrowserRouter>
</>
);
}
export default App;

