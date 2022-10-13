import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import { app } from '../../firebase';

import MyContext from '../../context';


function Login(props){
    
    const [userCredentials, setUserCredentials] = useState(null);
    const [authErrorMsg, setAuthErrorMsg] = useState('');

    const { UID, setUID } = useContext(MyContext);

    useEffect(()=>{
    },[UID])

    async function checkSubmit(e){
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if(email==''){
            setAuthErrorMsg(`Email can't be empty`);
            return;
        }
        if(password==''){
            setAuthErrorMsg(`Password can't be empty`);
            return;
        }
        const localAuth = getAuth(app);
        (function loginUser(){
            signInWithEmailAndPassword(localAuth, email, password)
           .then((userCredential) => {
            setUserCredentials(userCredential);
            console.log(userCredential)
           })
           .catch((error) => {
            console.log(error.code)
            if(error.code=='auth/user-not-found'){
                setAuthErrorMsg('User not found');
                return;
            } else if(error.code=='auth/wrong-password'){
                setAuthErrorMsg('Wrong password');
                return;
            } else if(error.code=='auth/network-request-failed'){
                setAuthErrorMsg('Network request failed. Please try again later.')
            } else{
                setAuthErrorMsg('Unrecognized error message. Check the email format');
                return;
            }
           });
       })()
    }

    useEffect(()=>{
        if(userCredentials!=null){
            setUID(userCredentials.user.uid);
        }
    },[userCredentials])


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
            <button className='button'>Log in</button>
            <button className='auth-goBack-btn' type='button' onClick={()=>{props.authState.setAuthButton('default')}}>Go back</button>
        </form>
    </div>
    );
}

export default Login;