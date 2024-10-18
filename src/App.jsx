import './App.css';
import { useState } from "react";

function App() {
  let [amount, setAmount] = useState(0);
  let [type, setType] = useState("income");
  let [transaction, setTransactions] = useState([]);
  let [isEditing, setIsEditing] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(null);

  let handleTransactions = () => {
    if (isEditing) {
      let copy = [...transaction];
      copy[currentIndex] = { amount, type };
      setTransactions(copy);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTransactions([...transaction, { amount, type }]);
    }
    setAmount(0);
  };

  let editExpense = (index) => {
    setAmount(transaction[index].amount);
    setType(transaction[index].type);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  let delExpense = (index) => {
    let copy = [...transaction];
    copy.splice(index, 1);
    setTransactions(copy);
  };

  let totalIncome = transaction.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + Number(curr.amount) : acc;
  }, 0);

  let totalExpense = transaction.reduce((acc, curr) => {
    return curr.type === 'expense' ? acc + Number(curr.amount) : acc;
  }, 0);

  let balance = totalIncome - totalExpense;

  return (
    <center>
    <div className="App">
      <h1>Expense Management System</h1>
      <div className="summary">
        <div className="summary-item">
          <p>Total Income</p>
          <p>${totalIncome}</p>
        </div>
        <div className="summary-item">
          <p>Total Expense</p>
          <p>${totalExpense}</p>
        </div>
        <div className="summary-item">
          <p>Balance</p>
          <p>${balance}</p>
        </div>
      </div>
      <div className="transaction-input">
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          placeholder="Enter amount"
        />
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleTransactions}>
          {isEditing ? "Update" : "Submit"}
        </button>
      </div>
      <div className="transaction-list">
        <ul>
          {transaction.map((data, index) => (
            <li key={index}>
              <span>${data.amount} - {data.type}</span>
              <div className="actions">
                <button onClick={() => editExpense(index)}>Edit</button>
                <button onClick={() => delExpense(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </center>
  );
}

export default App;

