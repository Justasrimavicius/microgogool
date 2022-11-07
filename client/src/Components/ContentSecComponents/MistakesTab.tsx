import React, { useContext, useEffect, useState } from 'react';

import UIDContext from 'src/UIDContext';
const key = require('key-creator');


interface specificSectionsAllMistakes{
    sectionNumber: number,
    badSelectAnswers: badSelectAnswersObject[],
    badDnDAnswers: badDnDAnswersObject[]
}
interface badSelectAnswersObject{
    questionTitle: string,
    correctAnswer: string[],
    userAnswer: string[]
}
interface badDnDAnswersObject{
    correctAnswer: string[],
    possibleAnswer: string[],
    questionTitle: string
}

function MistakesTab() {
    
    const [allUserMistakes, setAllUserMistakes] = useState<specificSectionsAllMistakes[] | null>(null);
    const [noMistakes, ShowNoMistakes] = useState<boolean>(false);

    const { UID, setUID } = useContext(UIDContext);

    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://microgoogol.herokuapp.com/getUserMistakes', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            setAllUserMistakes(parsedResponse);
        }
    },[])

    useEffect(()=>{
        if(allUserMistakes?.length==0)ShowNoMistakes(true);
    },[allUserMistakes])

    return (
        <div className='mistakes-tab'>
            <img src={require('../../Photos/error.png')} alt='error image'></img>
            
            {noMistakes==true ? <p className='no-mistakes'>You haven't made any mistakes. Very good! Or is it..?</p> : <p>Mistakes you have recently made</p>}

            {allUserMistakes!=null ? 
                <>
                {/* .map for badDnDAnswers */}
                {allUserMistakes.map((specificSectionsMistakes: specificSectionsAllMistakes)=>{
                    if(specificSectionsMistakes.badDnDAnswers.length!=0){
                        return specificSectionsMistakes.badDnDAnswers.map((singleBadDnDAnswer: badDnDAnswersObject)=>{
                            return(
                                <div className='mistakesTab-single-badAnswer' key={key.generate()}>
                                    <p className='badAnswer-title'>{singleBadDnDAnswer.questionTitle}</p>
                                    <div className='mistakes-tab-answers'>
                                        <p className='mistakes-tab-wys'>Words given:</p>
                                        <div className='mistakes-tab-single-badAnswer-userAnsweredWords'>
                                            {singleBadDnDAnswer.possibleAnswer.map((singleAnswer: string)=>{
                                                return(
                                                    <p key={key.generate()}>{singleAnswer}</p>
                                                )
                                            })}
                                        </div>
                                        <p className='mistakes-tab-tca'>Correct order:</p>
                                        <div className='mistakes-tab-single-badAnswer-correctWords'>
                                            {singleBadDnDAnswer.correctAnswer.map((singleAnswer: string)=>{
                                                return(
                                                    <p key={key.generate()}>{singleAnswer}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                })}
                {/* .map for badSelectAnswers */}
                {allUserMistakes.map((specificSectionsMistakes: specificSectionsAllMistakes)=>{
                    if(specificSectionsMistakes.badSelectAnswers.length!=0){
                        return specificSectionsMistakes.badSelectAnswers.map((singleBadSelectAnswer: badSelectAnswersObject)=>{
                            return(
                                <div className='mistakesTab-single-badAnswer' key={key.generate()}>
                                    <p className='badAnswer-title'>{singleBadSelectAnswer.questionTitle}</p>
                                    <div className='mistakes-tab-answers'>
                                        <p className='mistakes-tab-wys'>What you selected:</p>
                                        <div className='mistakes-tab-single-badAnswer-userAnsweredWords'>
                                            {singleBadSelectAnswer.userAnswer.map((singleAnswer: string)=>{
                                                return(
                                                    <p key={key.generate()}>{singleAnswer}</p>
                                                )
                                            })}
                                        </div>
                                        <p className='mistakes-tab-tca'>The correct answer/s:</p>
                                        <div className='mistakes-tab-single-badAnswer-correctWords'>
                                            {singleBadSelectAnswer.correctAnswer.map((singleAnswer: string)=>{
                                                return(
                                                    <p key={key.generate()}>{singleAnswer}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                })}
                </>
            : null}
        </div>
    );
}

export default MistakesTab;