import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if (process.env.NODE_ENV === 'production') {
disableReactDevTools();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path ='/*' element = { <App />} ></Route>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

