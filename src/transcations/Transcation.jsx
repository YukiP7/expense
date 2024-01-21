import { useState, useEffect } from 'react';
import dataService from '../appwrite/dataConfig.js';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await dataService.getTranscations();
      setTransactions(data.documents || []); // Ensure transactions is an array
    };

    fetchTransactions();
  }, []);

  const handleSearch = () => {
    if (Array.isArray(transactions)) {
      const filtered = transactions.filter(
        (transaction) => transaction.date === searchDate
      );
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div>
      <h1>All Transactions</h1>

      <div>
        <label htmlFor="searchDate">Search by Date:</label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
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
                  <td>{transaction.title}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))
            : Array.isArray(transactions) &&
              transactions.map((transaction) => (
                <tr key={transaction.$id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.price}</td>
                  <td>{(transaction.date)}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

