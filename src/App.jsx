import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/authService';
import Sidebar from './Sidebar/Sidebar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { login, signup } from './store/authSlice.js';

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

  return !loading ? (
    <div>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <Dashboard />
        </>
      ) : (
        <>
          <Signup onSignupSuccess={handleSignupSuccess} />
          <Login />
        </>
      )}
    </div>
  ) : null;
}

export default App;

