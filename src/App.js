import { Route, Routes} from "react-router-dom";
import React from 'react';
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";
import Alldata from "./components/alldata";
import Missing from "./components/missing";
import Layout from "./components/Layout";



const ROLES = {
  'User': 2023,
  'Editor': 1554,
  'Admin': 1998
}

function App() {
  
 
  return (

    <>
      <NavBar />
      <div className="container">

      
          <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
          <Route path = "/home" element={<Home />} />
          <Route path ="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/alldata" element={<Alldata />} />
          
          {/* catch all   /> */}
          <Route path="*" element={<Missing />}></Route>
          
          </Route>
          </Routes>
      </div>
   
    </>
  )
}
export default App;