import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import dataService from '../appwrite/dataConfig.js';

const Dashboard = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expense, setExpense] = useState(0);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseId, setExpenseId] = useState('');
  const [budgetTitle, setBudgetTitle] = useState('');
  const [budget, setBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    // Save budget to Appwrite
    await dataService.saveBudget({ budgetTitle, budget});

    setBudget((prevBudget) => prevBudget + budget);
    setBudgetTitle('') ;
    setBudget(0); // Clear the input field after adding the budget
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const descrip = document.querySelector('#description').value;
    const wrngAns = document.querySelector('#wrng-ans');
    const ansList = document.querySelector('#ans');

    if (isNaN(expense) || expense <= 0) {
      wrngAns.innerHTML = `Invalid Input ${expense}`;
    } else {
      wrngAns.innerHTML = '';

      // Save expense to Appwrite
      await dataService.saveExpense({ expenseName, expense, expenseDate, expenseId });

      // Update Expense List
      const expenseItem = document.createElement('li');
      expenseItem.innerHTML = `${descrip} <span>${expense}</span>`;
      ansList.appendChild(expenseItem);

      // Reset form fields
      setExpenseName('') ;
      setExpense(0);
    }
  };

  // Fetch transactions and update budget and expense on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataService.getTranscations();
  
        // Check if the 'documents' property exists and is an array
        const transactions = response.documents || [];
  
        // Calculate total budget
        const newTotalBudget = transactions.reduce((acc, transaction) => acc + transaction.budget, 0);
        setTotalBudget(newTotalBudget);
  
        // Calculate total expense
        const newTotalExpense = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
        setTotalExpense(newTotalExpense);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <div className="information">
      <div className="Transcations">
        <h1>All Transactions</h1>
        <form id="one">
          <input
            type="text"
            placeholder="Budget Name"
            value={budgetTitle}
            onChange={(e) => setBudgetTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <button id="addBud" onClick={handleAddBudget}>
            + Add Budget
          </button>
        </form>

        <div className="foot-panel">
          <div className="div">
            <p>Total Budget</p>
            <div className="total_amount">
              <FontAwesomeIcon icon={faDollarSign} className="fa-xl" />
              <div id="budget">{totalBudget}</div>
            </div>
          </div>
          <div className="div">
            <p>Total Expense</p>
            <div className="total_amount">
              <FontAwesomeIcon icon={faDollarSign} className="fa-xl" />
              <div id="expense">{totalExpense}</div>
            </div>
          </div>
          <div className="div">
            <p>Net Balance</p>
            <div className="total_amount">
              <FontAwesomeIcon icon={faDollarSign} className="fa-xl" />
              <div id="balance">{totalBudget - totalExpense}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="expense_Tracker">
        <div className="container">
          <h2>Expense Calculator</h2>
          <form id="two" onSubmit={handleAddExpense}>
            <label>Description</label>
            <input
              type="text"
              id="description"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />

            <label>Amount</label>
            <input
              type="number"
              id={(Math.random() * 100) + 1}
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />

            <label>Date</label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />

            <button
              id="addExp"
              onClick={handleAddExpense}
            >
              + Add Expense
            </button>

            <div id="results">
              <div id="wrng-ans"></div>
              <h3>Expense List</h3>
              <ul id="ans"></ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

