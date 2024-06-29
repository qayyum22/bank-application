import React, { useState, useEffect } from "react";
import { getAccountHolder } from "../services/api";

const AccountHolderDetails = ({ accountHolderId }) => {
  const [accountHolder, setAccountHolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountHolder = async () => {
      try {
        const response = await getAccountHolder(accountHolderId);
        setAccountHolder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch account holder details");
        setLoading(false);
      }
    };

    fetchAccountHolder();
  }, [accountHolderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!accountHolder) return <div>No account holder found</div>;

  return (
    <div className="account-holder-details">
      <h2>{accountHolder.name}</h2>
      <p>Email: {accountHolder.email}</p>
      <h3>Accounts:</h3>
      <ul>
        {accountHolder.accounts.map((account) => (
          <li key={account.id}>
            Account Number: {account.accountNumber}, Balance: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountHolderDetails;
