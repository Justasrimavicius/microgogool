import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import MyContext from '../../context';

function Login(props){
    
    const [userCredentials, setUserCredentials] = useState<any>(null);
    const [authErrorMsg, setAuthErrorMsg] = useState('');

    const { UID, setUID } = useContext(MyContext);

    function submitForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
        }));

        xhr.onload = ()=>{
            console.log(xhr.responseText);
        }
    }


    useEffect(()=>{
        if(userCredentials!=null){
            setUID(userCredentials.user.uid);
        }
    },[userCredentials])


    return (
        <div className='login-component'>
        <form onSubmit={(e)=>{submitForm(e)}}>
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