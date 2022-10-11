import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';

function Signup(props) {

    const [authErrorMsg, setAuthErrorMsg] = useState('');

    function checkSubmit(e){
        e.preventDefault();

        const errorMsg = document.querySelector('.signup-component-errorMsg');
        setAuthErrorMsg('');

        const email = document.querySelector('#email').value;
        const emailR = document.querySelector('#emailR').value;
        const password = document.querySelector('#password').value;
        const passwordR = document.querySelector('#passwordR').value;

        // email checking
        if(email!=emailR){
            setAuthErrorMsg(`emails don't match`);
            return;
        }
        if(email.length<6){
            setAuthErrorMsg('email length must be greater than 5');
            return;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setAuthErrorMsg('Not a valid email address');
            return;
        }

        // password checking
        if(password!=passwordR){
            setAuthErrorMsg(`Passwords don't match`);
            return;
        }
        if(password.length<8){
            setAuthErrorMsg('Password length must be greater than 7');
            return;
        }

        // firebase authentication
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log(userCredential)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code=='auth/invalid-email'){
                setAuthErrorMsg('Not a valid email address');
            }
            if(error.code=='auth/email-already-in-use'){
                setAuthErrorMsg('Email is already in use');
            }
        });
    }

    return (
        <div className='signup-component'>
            <form onSubmit={(e)=>{checkSubmit(e)}}>
                <p>Fill in the form</p>
                <div className='signup-component-emailDiv'>
                    <label htmlFor='email'>Email:</label>
                    <input id='email' name='email'></input>
                    <label htmlFor='emailR'>Repeat email:</label>
                    <input id='emailR' name='emailR'></input>
                </div>

                <div className='signup-component-passwordDiv'>
                    <label htmlFor='password'>Password:</label>
                    <input id='password' name='password'></input>
                    <label htmlFor='passwordR'>Repeat password:</label>
                    <input id='passwordR' name='passwordR'></input>
                </div>
                <p className='signup-component-errorMsg'>{authErrorMsg}</p>
                <button>Sign up</button>
                <button className='auth-goBack-btn' type='button' onClick={()=>{props.authState.setAuthButton('default')}}>Go back</button>
            </form>
        </div>
    );
}

export default Signup;