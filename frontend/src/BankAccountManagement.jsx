import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountHolderDetails = ({ accountHolder, onClose }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async () => {
    try {
      await axios.post(`http://localhost:8080/api/bank/account-holders/${accountHolder.id}/accounts/${selectedAccount.accountNumber}/deposit?amount=${amount}`);
      setMessage('Deposit successful');
      setAmount('');
    } catch (error) {
      setMessage('Deposit failed');
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/bank/account-holders/${accountHolder.id}/accounts/${selectedAccount.accountNumber}/withdraw?amount=${amount}`);
      if (response.data) {
        setMessage('Withdrawal successful');
      } else {
        setMessage('Insufficient funds');
      }
      setAmount('');
    } catch (error) {
      setMessage('Withdrawal failed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">{accountHolder.name}'s Accounts</h2>
      <button onClick={onClose} className="mb-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      {accountHolder.accounts.map(account => (
        <div key={account.accountNumber} className="mb-4 p-4 border rounded">
          <h3 className="font-semibold">{account.type} Account: {account.accountNumber}</h3>
          <p>Balance: ${account.balance}</p>
          <button onClick={() => setSelectedAccount(account)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Select</button>
        </div>
      ))}
      {selectedAccount && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Selected Account: {selectedAccount.accountNumber}</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-2 p-2 border rounded w-full"
          />
          <div className="mt-2">
            <button onClick={handleDeposit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Deposit</button>
            <button onClick={handleWithdraw} className="bg-red-500 text-white px-4 py-2 rounded">Withdraw</button>
          </div>
          {message && <p className="mt-2 text-blue-500">{message}</p>}
        </div>
      )}
    </div>
  );
};

const BankAccountManagement = () => {
  const [accountHolders, setAccountHolders] = useState([]);
  const [selectedAccountHolder, setSelectedAccountHolder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccountHolders();
  }, []);

  const fetchAccountHolders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bank/account-holders');
      setAccountHolders(response.data);
    } catch (err) {
      setError('Failed to fetch account holders');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bank Account Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Holders</h2>
        {accountHolders.map(accountHolder => (
          <div key={accountHolder.id} className="mb-4 p-4 border rounded">
            <h3 className="font-semibold">{accountHolder.name}</h3>
            <p>Email: {accountHolder.email}</p>
            <p>Phone: {accountHolder.phoneNumber}</p>
            <button 
              onClick={() => setSelectedAccountHolder(accountHolder)} 
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Accounts
            </button>
          </div>
        ))}
      </div>

      {selectedAccountHolder && (
        <AccountHolderDetails 
          accountHolder={selectedAccountHolder} 
          onClose={() => setSelectedAccountHolder(null)} 
        />
      )}
    </div>
  );
};

export default BankAccountManagement;
