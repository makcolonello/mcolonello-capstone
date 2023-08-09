
import axios from '../api/axios';
import { useState } from 'react';
import Card from './card';


function Deposit() {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async () => {
    try {
      // Send request to deposit endpoint with username and amount
      const response = await axios.post('/deposit',{ username, amount },
      {
        headers : {
          
            'Content-Type' : 'application/json',
            withCredentials: true
        }});
      const newBalance = response.data.balance;

      // Show success message
      setMessage(`Deposit successful! ${username}'s new balance is ${newBalance}`);
    } catch (error) {
      // Handle error
      if (error.response) {
        // Show error message from server
        setMessage(error.response.data.message);
      } else {
        // General error handling
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
   <Card
   header="Deposit"
   bgcolor="success"
   body={
    <>
      
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </label>
      <label>
        Enter Deposit Amount:
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          placeholder="Enter deposit amount"
        />
      </label>
      <button className="btn btn-dark" onClick={handleDeposit}>Deposit</button>
      {message && <div>{message}</div>}

    </>
   }
   />
  )
}

export default Deposit;



 