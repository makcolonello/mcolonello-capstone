
import axios from '../api/axios';

 function Deposit() {

  const onDeposit = (e) => {
      e.preventDefault()

      const username = e.target.username.value
      const amount = e.target.amount.value

      console.log(`Username ${username} Amount ${amount}`)

      axios.put('/deposit', {
          method : 'PUT',
          headers : {
            
              'Content-Type' : 'application/json',
              withCredentials: true
          },
          body : JSON.stringify({ username, amount })
      }).then( res => res.json() )
      .then(json => console.log(json))
  }

  return (
<div>
          <h1> Deposit Amount </h1>
          <form onSubmit={onDeposit}>
              <input type='text' placeholder='Username' name='username'/>
              <input type='number' placeholder='Amount' name='amount'/>
              <input type='submit' value='Deposit' />
          </form>
          </div>
  )

}

export default Deposit