import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChartLine, faCreditCard, faMoneyBillWave, faMoneyBillAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import authService from '../appwrite/authService';
import Dashboard from '../Dashboard/Dashboard';
import Transactions from '../transcations/Transcation';
import Budget from '../Budget/Budget';
import Expense from '../Expense/Expense';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({}) => {
  const [userName, setUserName] = useState('');
  const [type, setType] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from AuthService
    const fetchUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();

        // Update state with fetched user data
        setUserName(currentUser.name);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserData();

    // Event listener to check for window resize
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <>
      <div className={`First ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar">
          {isMobileView && (
            <div className="hamburger" onClick={handleToggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          )}
          {isMobileView && (
            <FontAwesomeIcon icon={faTimes} className="fa-2xl" id="cross" onClick={handleToggleSidebar} />
          )}
          <div className="profile">
            <div className="feature1">
              <div className="detail">
                <h2> Welcome {userName} !</h2>
              </div>
            </div>
            <div className="options">
              <div className="opt-bar">
                <FontAwesomeIcon icon={faChartLine} />
                <button className={`button ${type === 'dashboard' ? 'active' : ''}`} onClick={() => setType('dashboard')}>Dashboard</button>
              </div>
              <div className="opt-bar">
                <FontAwesomeIcon icon={faCreditCard} />
                <button className={`button ${type === 'transactions' ? 'active' : ''}`} onClick={() => setType('transactions')}>Transactions</button>
              </div>
              <div className="opt-bar">
                <FontAwesomeIcon icon={faMoneyBillWave} />
                <button className={`button ${type === 'budget' ? 'active' : ''}`} onClick={() => setType('budget')}>Budget</button>
              </div>
              <div className="opt-bar">
                <FontAwesomeIcon icon={faMoneyBillAlt} />
                <button className={`button ${type === 'expense' ? 'active' : ''}`} onClick={() => setType('expense')}>Expense</button>
              </div>
              <div className="opt-bar">
                <FontAwesomeIcon icon={faChevronRight} />
                <button onClick={handleLogout}>Signout</button>
              </div>
            </div>
          </div>
        </div>
        {type === 'dashboard' && !isMobileView && <div className="dashboard"><Dashboard /></div>}
        {type === 'transactions' && !isMobileView && <div className="transactions"><Transactions /></div>}
        {type === 'budget' && !isMobileView && <div className="budget"><Budget /></div>}
        {type === 'expense' && !isMobileView && <div className="expense"><Expense /></div>}
      </div>

        {/* Display other content when the sidebar is closed */}
        {!isSidebarOpen && (
        <div className="content-container">
          {type === 'dashboard' && isMobileView && <Dashboard />}
          {type === 'transactions' && isMobileView && <Transactions />}
          {type === 'budget' && isMobileView && <Budget />}
          {type === 'expense' && isMobileView && <Expense />}
        </div>
      )}
    </>
  );
};

export default Sidebar;




