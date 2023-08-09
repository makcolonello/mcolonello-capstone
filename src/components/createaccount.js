
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import axios from '../api/axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const CREATEACCOUNT_URL = '/createaccount';


const CreateAccount = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [firstName, setFirstName] = useState('');
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameFocus, setLastNameFocus] = useState(false)

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {

        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // prevent Javascript hack if button is enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email)
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(CREATEACCOUNT_URL, 
                JSON.stringify({ firstName, lastName, email, username, password }),
            {
                headers: { 'Content-Type': 'application/json'},
               // methods: 'OPTIONS',
                withCredentials: true
            });
            console.log(response?.data)
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);

            setFirstName("");
            setLastName("");
            setEmail("");
            setUsername("");
            setPassword("");
            setMatchPassword("");
          
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username unavailable');
            } else {
                setErrMsg('Create Account Failed')
            }
            errRef.current.focus();
        }
    }

  /*  function clearForm() {
        setFirstName("")
        setLastName("")
        setEmail("")
        setUsername("");
        setPassword("");
        setSuccess(false);
    }
*/


    return (
        <Card
            bgcolor="dark"
            header="Create Account"
            body={success ?
        
         ( <>
         <section>
            <h5>Success!</h5><br/>
            <p>Thank you for creating your account with Secure Bank</p><br/>
            <p><a href="/login">Login</a></p><br/>
            <button type="button" className="btn btn-dark">Add another account</button>
         </section>
         </>
         ) : (
        <>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form onSubmit={handleSubmit}>

                <label htmlFor="firstname">
                    First Name:
                    <input
                    type="text"
                    id="firstname"
                    ref={userRef}
                    autoComplete="off"
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required 
                    aria-describedby="firstnamenote"
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}/>
                     <p id="firstnamenote" className={firstNameFocus && firstName
                     ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter first name.</p><br/>
                </label><br/>

                <label htmlFor="lastname">
                    Last Name:
                    <input
                    type="text"
                    id="lastname"
                    ref={userRef}
                    autoComplete="off"
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-describedby="lastnamenote"
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}/>
                     <p id="lastnamenote" className={lastNameFocus && lastName
                     ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter last name.</p><br/> 
                </label><br/>

                <label htmlFor="email">
                    Email:
            <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                    </span><br/>
            </label><br/>
                <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="off"
                placeholder="Enter Email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"} 
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}/>
                <p id="emailnote" className={emailFocus && email &&
                !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Please enter a valid email.</p><br/>

            <label htmlFor="username">
            Username:
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !username ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                    </span><br/>
            </label>
            <input type="text" 
            id="username"
            ref={userRef}
            autoComplete="off"
            placeholder="Create Username" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            aria-invalid={validName ? "false" : "true"} 
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}/>
            <p id="uidnote" className={userFocus && username &&
            !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, and hyphens are allowed.</p><br/>
            
            <label htmlFor="password">
            Password:
            <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPassword || !password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                    </span><br/>
                </label>
                <input 
                type="password"
                id="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}/>
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number, and a special character. <br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                </p><br/>

                <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                    </span><br/>
                </label>
                <input 
                type="password"
                id="confirm_pwd"
                placeholder="Enter Password"
                value={matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)} />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p><br/>

                <button className="btn btn-light"  disabled={!validName || !validPassword || !validMatch ? true : false}>Create Account</button>
               
            </form>
            <p>
                Already have an account?<br />
                <span className="line">
                    <a href="/login">Login</a>
                </span>
            </p>
        </section>
     </>
    )}
/>
)}

export default CreateAccount;
