import { useState } from 'react';
import Card from './card';


export function Withdraw(){
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [balance, setBalance] = useState(25);
    const [withdraw, setWithdraw] = useState(0);

    

    

    

    function validate(field, label) {
        let isValid = true
        if (!field) {
            setStatus(`Error: Please enter an amount to ${label}! `);
            setTimeout(() => setStatus(''), 3000)
            return false;
        }
        if (Math.sign(field) <= -1) {
            setStatus(`Error: Cannot enter a negative number!`);
            setTimeout(() => setStatus(''), 3000);
            return false 
        }

        if (Math.sign(field) <= 0) {
            setStatus(`Error: Cannot withdraw $0!`);
            setTimeout(() => setStatus(''), 3000);
            return false
        }

        if (withdraw > balance) {
            setStatus(`Error: Insufficient Funds!`);
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return isValid
    
    }

        function newWithdraw() {
    if (!validate(withdraw, "withdraw")) return;
   
            if (!validate(withdraw))
    return;
    let newAmount = balance - parseInt(withdraw);
   
    setShow(false);

    setBalance(newAmount);
    alert(`Withdraw Successful! New balance: $${newAmount}`);

        }
        function clearForm() {
            setWithdraw(0);
            setBalance('');
            setShow(true);
        }

    

return (
    <Card
    header="Withdraw"
    bgcolor="secondary"
    status={status}
    body={show ? (
        <>
         Withdraw<br/>
        <input type="number" className="form-control" id="withdraw"
        placeholder="Enter Amount" value={withdraw} onChange={(e) => setWithdraw(e.currentTarget.value)} /> <br/>
        Balance<br/>
        <input type="number" className="form-control" id="balance"
        placeholder="Account Balance" value={balance} onChange={(e) => setWithdraw(e.currentTarget.value)} /> <br/>
        <button type="submit" className="btn btn-dark" onClick={newWithdraw}>Withdrawal Amount</button> <br/>
        </>
    ):(
        <>
        <h5>Withdrawal Successful!</h5>
        <button type="submit" className="btn btn-dark" onClick={clearForm}>Withdraw More</button> 
        <br/>
         </>
            )}
        />
    )}


export default Withdraw;