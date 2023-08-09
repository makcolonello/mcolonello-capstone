
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import Card from './card';
import axios from '../api/axios';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
   const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, resetUsername, usernameAttributes] =  useInput('username', '')
    const [password, setPassword] = useState('');
   // const[success, setSuccess] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(LOGIN_URL, 
            JSON.stringify({ username, password }),
            {
            headers: { 'Content-Type' : 'application/json' },
           // methods: 'OPTIONS',
            withCredentials: true
            });
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ username, roles, accessToken })
       //setUsername('');
       resetUsername();
        setPassword('');
        //setSuccess(true);
      navigate(from, { replace: true });


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }   
    }

  
    return (
        <Card
            bgcolor="danger"
            header="Login"
            body={ /*success ?
        
                ( <>
                <section>
                    <h1>Success!</h1>
                   <p>{username} is logged in.</p><br/>
                   <p><a href="/home">Home</a></p><br/>
                </section>
                </>
                ) : */ ( 
        <>
       <section>
       <p ref={errRef} className={errMsg ? "errmsg" :
       "offscreen"} aria-live="assertive">{errMsg}</p>

       <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input 
        type="text"
        id="username"
        placeholder="Enter Username"
        ref={userRef}
        autoComplete="off"
        {...usernameAttributes}
        required
        />

<label htmlFor="password">Password:</label>
        <input 
        type="password"
        id="password"
        placeholder="Enter Password"
        onChange= {(e) => setPassword(e.target.value)}
        value={password}
        required
        />

        <button className="btn btn-dark" >Login</button>
        <div className="btn btn-dark">
        <input 
            type="checkbox" 
            id="persist"
           onChange={toggleCheck}
           checked={check}
            />
            <label htmlFor="persist">Trust This Device</label>
        </div>
       </form>
       <p>
       Need an Account?<br />
       <span className="line">
        <a href="/createaccount">Create Account</a>
       </span>
       </p>
       </section>
       </>
     ) } 
/>
)}

export default Login;
