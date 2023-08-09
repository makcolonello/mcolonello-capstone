import { useState } from 'react';
import axios from '../api/axios';
import Card from './card';

function Balance() {

    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(null);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleBalance = (e) => {
        e.preventDefault()
        axios.get(`/balance/${username}`)
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error(error);
            alert('No user found.');
        });
    };

    return (
        <Card
        header="Balance"
        bgcolor="info"
        body={
            <>
            <section>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                placeholder="Enter Username"
                onChange={handleUsername}
                />
                <button className="btn btn-dark" onClick={handleBalance}>Check Balance</button>
            </section>
            {balance !== null ?  (
                <p>{username}'s balance: ${balance}</p>
            ) : (
                <p>Please enter a username to access your balance!</p>
            )}
            
            </>
        }
        />
    )
}

export default Balance;

