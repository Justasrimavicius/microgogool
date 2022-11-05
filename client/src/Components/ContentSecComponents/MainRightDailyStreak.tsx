import React, { useContext, useEffect, useState } from 'react';
import UIDContext from 'src/UIDContext';
function MainRightDailyStreak() {
    const { UID, setUID } = useContext(UIDContext);

    const [dailyStreak, setDailyStreak] = useState<number>(0);

    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/getDailyStreak', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            setDailyStreak(parsedResponse)
        }
    },[])

    return (
        <div className='main-right-daily-streak'>
            <p className='main-right-streak-title'>Your daily streak: <strong className='dailyStreakNum'>{dailyStreak}</strong></p>
            <p>Compete with your friends! Who can maintain a larger daily login streak?</p>
        </div>
    );
}

export default MainRightDailyStreak;