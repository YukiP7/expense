import React, { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import dataService from '../appwrite/dataConfig';
import './Budget.css'

const Budget = () => {
  const [budgetTitle, setBudgetTitle] = useState('');
  const [budget, setBudget] = useState(0);
  const [totalBudget , setTotalBudget] = useState(0) ;

  const handleAddBudget = async (e) => {
    e.preventDefault();
    // Save budget to Appwrite
    await dataService.saveBudget({ budgetTitle, budget});

    setBudget((prevBudget) => prevBudget + budget)
    setTotalBudget((prevBudget) => prevBudget + budget) ;
    setBudgetTitle('') ;
    setBudget(0); // Clear the input field after adding the budget
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataService.getTranscations();
  
        // Check if the 'documents' property exists and is an array
        const transactions = response.documents || [];
  
        // Calculate total budget
        const newTotalBudget = transactions.reduce((acc, transaction) => acc + transaction.budget, 0);
        setTotalBudget(newTotalBudget);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
  };
  fetchData();
}, []);

  return (
    <div className="info">
      <div className="total">
        <h1>Total Budget</h1>
        <div className="totalBudget_amount">
          <FontAwesomeIcon icon={faDollarSign} className="fa-2xl" />
          <div id="budget-amt" >{totalBudget}</div>
        </div>
      </div>
      <form className = 'budget-form' onSubmit={handleAddBudget}>
        <input
          type="text"
          placeholder="Add Description"
          value={budgetTitle}
          onChange={(e) => setBudgetTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          id="inputAmt"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button className='budget-button' type="submit" onSubmit={handleAddBudget}>+ Add Budget</button>
      </form>
    </div>
  )
}

export default Budget
