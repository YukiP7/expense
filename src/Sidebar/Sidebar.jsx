import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChartLine, faCreditCard, faMoneyBillWave, faMoneyBillAlt, faChevronRight, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css' ;
import { useState , useEffect } from 'react';
import authService from '../appwrite/authService';

const Sidebar = () => {
  const [userName, setUserName] = useState('');
  const [userBudget, setUserBudget] = useState(0);

  useEffect(() => {
    // Fetch user data from AuthService
    const fetchUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();

        // Update state with fetched user data
        setUserName(currentUser.name);
        setUserBudget(currentUser.budget);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();
  }, []); 

  const handleLogout = () => {
     authService.logout();
  }

  return (
    <div className="sidebar">
      <div className="hamburger">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <FontAwesomeIcon icon={faTimes} className="fa-2xl" id="cross" />
      <div className="profile">
        <div className="feature1">
          <div className="circle"></div>
          <div className="detail">
            <h2>{userName}</h2>
            <p id="money">Your Money: {userBudget}</p>
          </div>
        </div>


        <div className="options">
          <div className="opt-bar">
            <FontAwesomeIcon icon={faChartLine} />
            <span>Dashboard</span>
          </div>
          <div className="opt-bar">
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Transactions</span>
          </div>
          <div className="opt-bar">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <span>Budget</span>
          </div>
          <div className="opt-bar">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <span>Expenses</span>
          </div>

          <div className="opt-bar">
            <FontAwesomeIcon icon={faChevronRight} />
            <span onClick={handleLogout}>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



