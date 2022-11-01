import React, { useContext, useEffect, useState } from 'react';
import UIDContext from 'src/UIDContext';

interface singleSectionsScore{
    sectionScore: number,
    badAnswersQnty: number,
    goodAnswersQnty: number
}

function MainRightScore(){
    const { UID, setUID } = useContext(UIDContext);

    const [finalScorePrcnt, setFinalScorePrcnt] = useState<string>('');

    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/getUsersScore', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            console.log(parsedResponse);
            let tempHolder = parsedResponse.reduce((previousValue: number, singleSectionsScore_current: singleSectionsScore)=>singleSectionsScore_current.sectionScore + previousValue,
                0
            )
            setFinalScorePrcnt((tempHolder/parsedResponse.length).toString().slice(0,5))
        }
    },[])

    return (
        <>
        {finalScorePrcnt.length!=0 ? 
        <div className='main-right-score'>
            <img src={require('../../Photos/world.png')} alt='world icon' style={{width: '40%'}}></img>
            <p className='main-right-score-title'>You have gotten {finalScorePrcnt}% of the questions right.</p>
            {parseFloat(finalScorePrcnt)>50 ? <p>You got some knowledge!</p> : <p>You can do better..</p>}
        </div> 
        : 
        <div>
        
        </div>}
        </>
    );
}

export default MainRightScore;