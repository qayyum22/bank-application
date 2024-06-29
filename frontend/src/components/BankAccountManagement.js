import React, { useState, useEffect } from "react";
import { createAccount, getAllAccounts } from "../services/api";
import AccountHolderDetails from "./AccountHolderDetails";

const BankAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountHolder, setSelectedAccountHolder] = useState(null);
  const [newAccount, setNewAccount] = useState({
    accountNumber: "",
    balance: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await getAllAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createAccount(newAccount);
      setNewAccount({ accountNumber: "", balance: "" });
      fetchAccounts();
    } catch (error) {
      console.error("Failed to create account:", error);
    }
  };

  return (
    <div className="bank-account-management">
      <h1>Bank Account Management</h1>

      <form onSubmit={handleCreateAccount}>
        <input
          type="text"
          placeholder="Account Number"
          value={newAccount.accountNumber}
          onChange={(e) =>
            setNewAccount({ ...newAccount, accountNumber: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={newAccount.balance}
          onChange={(e) =>
            setNewAccount({ ...newAccount, balance: e.target.value })
          }
        />
        <button type="submit">Create Account</button>
      </form>

      <h2>All Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li
            key={account.id}
            onClick={() => setSelectedAccountHolder(account.accountHolder.id)}
          >
            Account Number: {account.accountNumber}, Balance: ${account.balance}
          </li>
        ))}
      </ul>

      {selectedAccountHolder && (
        <AccountHolderDetails accountHolderId={selectedAccountHolder} />
      )}
    </div>
  );
};

export default BankAccountManagement;
