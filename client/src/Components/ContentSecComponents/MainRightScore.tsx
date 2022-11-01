import React, { useContext, useEffect, useState } from 'react';
import UIDContext from 'src/UIDContext';

interface singleSectionsScore{
    sectionScore: number,
    badAnswersQnty: number,
    goodAnswersQnty: number
}

function MainRightScore(){
    const { UID, setUID } = useContext(UIDContext);

    const [finalScorePrcnt, setFinalScorePrcnt] = useState<string>('noLessonsDone');

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
            if(parsedResponse.length!=0){
                let tempHolder = parsedResponse.reduce((previousValue: number, singleSectionsScore_current: singleSectionsScore)=>singleSectionsScore_current.sectionScore + previousValue,
                0
                )
                setFinalScorePrcnt((tempHolder/parsedResponse.length).toString().slice(0,5))
            } else {
                setFinalScorePrcnt('');
            }
        }
    },[])

    return (
        <>
        {finalScorePrcnt!='noLessonsDone' ? 
        
        <>
        {finalScorePrcnt.length!=0 ?
        <div className='main-right-score'>
            <img src={require('../../Photos/world.png')} alt='world icon' style={{width: '40%'}}></img>
            <p className='main-right-score-title' data-testid='main-right-score-title'>You have gotten {finalScorePrcnt}% of the questions right.</p>
            {parseFloat(finalScorePrcnt)>50 ? <p>You got some knowledge!</p> : <p>You can do better..</p>}
        </div> 
        : 
        <div className='main-right-score'>
            <img src={require('../../Photos/world.png')} alt='world icon' style={{width: '60%'}}></img>
            <p className='main-right-score-title' data-testid='main-right-score-title'>Your score</p>
            <p>Finish a lesson to see your score!</p>
        </div>}
        </>
        
        : null} 
        </>
    );
}

export default MainRightScore;