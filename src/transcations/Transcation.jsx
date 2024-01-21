import { useState, useEffect } from 'react';
import dataService from '../appwrite/dataConfig.js';

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
    if (searchDate.trim() === '') {
      // If search date is empty, show all transactions
      setFilteredTransactions([]);
    } else {
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
          {filteredTransactions.length > 0
            ? filteredTransactions.map((transaction) => (
                <tr key={transaction.$id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))
            : transactions.map((transaction) => (
                <tr key={transaction.$id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
