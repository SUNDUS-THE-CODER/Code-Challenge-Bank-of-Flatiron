import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [inputs, setInputs] = useState({});
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (inputs.date && inputs.description && inputs.category && inputs.amount) {
        let newQuestion = await fetch('http://localhost:8001/transactions', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs)
        });
        newQuestion = await newQuestion.json();
        onAddTransaction(newQuestion);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" onChange={(ev) => setInputs({ ...inputs, date: ev.target.value })} />
          <input type="text" name="description" placeholder="Description" onChange={(ev) => setInputs({ ...inputs, description: ev.target.value })} />
          <input type="text" name="category" placeholder="Category" onChange={(ev) => setInputs({ ...inputs, category: ev.target.value })} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" onChange={(ev) => setInputs({ ...inputs, amount: parseInt(ev.target.value) })} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
