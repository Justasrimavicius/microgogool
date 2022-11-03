import React, { useEffect, useRef } from 'react';

function LoadingScreen() {

    const loadingScreenRef = useRef<any>(null);

    useEffect(()=>{
        setTimeout(() => {
        loadingScreenRef.current.style.opacity='0';
        setTimeout(() => {
            loadingScreenRef.current.style.display='none';
        }, 1000);
        }, 2000);
    },[])

    return (
        <div className='LoadingScreen' ref={loadingScreenRef}>
            <div className="ring">Loading
                <span></span>
            </div>
        </div>
    );
}

export default LoadingScreen;