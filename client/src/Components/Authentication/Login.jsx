import React from 'react';
import { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../firebase';

function Login(props){
    
    const [authErrorMsg, setAuthErrorMsg] = useState('');

    async function checkSubmit(e){
        e.preventDefault();

        const email = document.querySelector('#email');
        const password = document.querySelector('#password');

        if(email==''){
            setAuthErrorMsg(`Email can't be empty`);
            return;
        }
        if(password==''){
            setAuthErrorMsg(`Password can't be empty`);
            return;
        }

        const auth = getAuth(app);
        (await function loginUser(){
            signInWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
           })
           .catch((error) => {
            if(error.code=='auth/user-not-found'){
                setAuthErrorMsg('User not found');
                return;
            } else if(error.code=='auth/wrong-password'){
                setAuthErrorMsg('Wrong password');
                return;
            } else{
                setAuthErrorMsg('Unrecognized error message. Check the email format');
                return;
            }
           });
              
       })()
    }

    return (
        <div className='login-component'>
        <form onSubmit={(e)=>{checkSubmit(e)}}>
            <p>Log in with your credentials</p>
            <div className='login-comoponent-inputHolder'>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email'></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password'></input>
            </div>
            <p className='login-component-errorMsg'>{authErrorMsg}</p>
            <button className='button'>Log in</button>
            <button className='auth-goBack-btn' type='button' onClick={()=>{props.authState.setAuthButton('default')}}>Go back</button>
        </form>
    </div>
    );
}

export default Login;