import { useState, useEffect } from 'react';
import dataService from '../appwrite/dataConfig.js';
import './Transcation.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await dataService.getTranscations();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const handleSearch = () => {
     if (Array.isArray(transactions)) {
      const formattedSearchDate = new Date(searchDate);
  
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
  
        // Compare the year, month, and day of the two dates
        return (
          formattedSearchDate.getFullYear() === transactionDate.getFullYear() &&
          formattedSearchDate.getMonth() === transactionDate.getMonth() &&
          formattedSearchDate.getDate() === transactionDate.getDate()
        );
      });
  
      setFilteredTransactions(filtered);
    }
  };
  
  
  
  return (
      <div className = 'info' >
      <h1>All Transactions</h1>

      <div>
        <label htmlFor="searchDate">Search by Date:</label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button className='transaction-button' onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredTransactions) && filteredTransactions.length > 0
            ? filteredTransactions.map((transaction) => (
                <tr key={transaction.$id}>
                  <td>{transaction.Title}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))
            : Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <tr key={transaction.$id}>
                  <td>{transaction.Title ==null ? transaction.budgetTitle : transaction.Title}</td>
                  <td>{transaction.price == null ? transaction.budget : transaction.price}</td>
                  <td>{transaction.date == null ? "--" : transaction.date}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

