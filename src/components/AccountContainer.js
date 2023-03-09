import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState(null);

  const handleAddTransaction = (newTransaction) => setTransactions([...transactions, newTransaction]);

  const transactionsToDisplay = filter ? transactions.filter((item) => {
    return (
      item.id === parseInt(filter) // Filter by ID
        || item.amount.toString().includes(filter) // Filter by amount
          || new Date(item.date).toDateString().toLowerCase().includes(filter.toLowerCase())
            || item.category.toLowerCase().includes(filter.toLowerCase()) // Filter by category
              || item.description.toLowerCase().includes(filter.toLowerCase())); // Filter by description
  }) : transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let fetchedItems = await fetch("http://localhost:8001/transactions");
        fetchedItems = await fetchedItems.json();
        setTransactions(fetchedItems);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchItems();
  }, []);
  return (
    <div>
      <Search setFilter={setFilter} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={transactionsToDisplay} />
    </div>
  );
}

export default AccountContainer;
