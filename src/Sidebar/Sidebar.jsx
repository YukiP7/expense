import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChartLine, faCreditCard, faMoneyBillWave, faMoneyBillAlt, faChevronRight, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css' ;
import { useState , useEffect } from 'react';
import authService from '../appwrite/authService';
import Dashboard from '../Dashboard/Dashboard';
import Transactions from '../transcations/Transcation';
import Budget from '../Budget/Budget';
import Expense from '../Expense/Expense';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({}) => {
  const [userName, setUserName] = useState('');
  const [userBudget, setUserBudget] = useState(0);
  const[type,setType] = useState('dashboard');
  const navigate = useNavigate()

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
     navigate('/')
  }

  return (
    <>
    <div className="First">
    <div className="sidebar">
      <div className="hamburger">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <FontAwesomeIcon icon={faTimes} className="fa-2xl" id="cross" />
      <div className="profile">
        <div className="feature1">
          <div className="detail">
            <h2> Welcome {userName} !</h2>
            <p id="money">Your Money: {userBudget}</p>
          </div>
        </div>
        <div className="options">
          <div className="opt-bar">
            <FontAwesomeIcon icon={faChartLine} />
            <button className= {`button ${type==="dashboard"?'active':''}`} onClick={() => setType("dashboard")}>Dashboard</button>
          </div>
           <div className="opt-bar">
            <FontAwesomeIcon icon={faCreditCard} />
            <button className= {`button ${type==="transactions"?'active':''}`} onClick={() => setType("transactions")}>Transactions</button>
          </div>
         <div className="opt-bar">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <button className= {`button ${type==="budget"?'active':''}`} onClick={() => setType("budget")}>Budget</button>
          </div>
          <div className="opt-bar">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <button className= {`button ${type==="expense"?'active':''}`} onClick={() => setType("expense")}>Expense</button>
          </div>

          <div className="opt-bar">
            <FontAwesomeIcon icon={faChevronRight} />
       <button onClick={handleLogout}>Signout</button>
          </div> 
        </div>
      </div>
    </div> 
      {type=== "dashboard" && (<div className='dashboard'><Dashboard/></div>)}
      {type=== "transactions" && (<div className='transactions'><Transactions/></div>)}
      {type=== "budget" && (<div className='budget'><Budget/></div>)}
      {type=== "expense" && (<div className='expense'><Expense/></div>)}
      </div>
      </>
    );
};

export default Sidebar;



