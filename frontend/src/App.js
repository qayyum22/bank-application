import './App.css';
import BankAccountManagement from './BankAccountManagement';
import AccountHolderDetails from './components/AccountHolderDetails';

function App() {
  return (
    <div className="App">
      
      <BankAccountManagement />
      <AccountHolderDetails />
      <BankAccountManagement />
      
    </div>
  );
}

export default App;
