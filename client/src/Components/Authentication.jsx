import React, { useEffect, useState } from 'react';

function Authentication() {

    const [authButton, setAuthButton] = useState(null);

    useEffect(()=>{
        if(authButton!=null){
            if(authButton=='signup'){
                document.querySelector('.auth-inputs-holder > button:nth-child(2)').classList.remove('auth-inputs-holder-login');
                document.querySelector('.auth-inputs-holder > button:nth-child(1)').classList.add('auth-inputs-holder-signup');
            }
            if(authButton=='login'){
                document.querySelector('.auth-inputs-holder > button:nth-child(1)').classList.remove('auth-inputs-holder-signup');
                document.querySelector('.auth-inputs-holder > button:nth-child(2)').classList.add('auth-inputs-holder-login');
            }
        }
    },[authButton])

    return (
        <div className='authentication'>
            <div>
                <p className='welcome-text'>Welcome to Microgoogol - a language learning platform!</p>
                <div className='auth-inputs-holder'>
                    <button onClick={()=>{setAuthButton('signup')}}>Sign up</button>
                    <button onClick={()=>{setAuthButton('login')}}>Log in</button>
                </div>
            </div>
        </div>
    );
}

export default Authentication;