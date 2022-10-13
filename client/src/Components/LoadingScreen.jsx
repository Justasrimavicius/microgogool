import React, { useEffect } from 'react';

function LoadingScreen() {

    useEffect(()=>{
        setTimeout(() => {
        document.querySelector('.LoadingScreen').style.opacity='1';
        }, 10);
    })

    return (
        <div className='LoadingScreen'>
            <div className="ring">Loading
                <span></span>
            </div>
        </div>
    );
}

export default LoadingScreen;