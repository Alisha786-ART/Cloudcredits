import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [description, setDescription] = useState('');

  const handleAddTransaction = () => {
    if (!amount || isNaN(amount)) return;
    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
    };
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setDescription('');
  };

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="balance">
        Balance: ₹{(totalIncome - totalExpense).toFixed(2)}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button onClick={handleAddTransaction}>Add</button>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>
        {transactions.map(t => (
          <div key={t.id} className={`transaction ${t.type.toLowerCase()}`}>
            ₹{t.amount.toFixed(2)} - {t.description} ({t.type})
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;