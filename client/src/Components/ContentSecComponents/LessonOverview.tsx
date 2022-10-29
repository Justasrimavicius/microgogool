import React, { useEffect, useRef } from 'react';
const key = require('key-creator');

interface props{
    lessonData: any
    returnToMain: any
}
interface singleSelectBadAnswer{
    questionTitle: string,
    questionObject: {
        correctAnswer: string[],
        possibleAnswers: string[],
        questionFormat: string,
        title: string
    },
    answeredWord: string[]
}
interface singleDnDBadAnswer{
    correctAnswer: string[],
    possibleAnswers: string[],
    questionFormat: string,
    title: string
}

interface anyBadAnswer extends singleSelectBadAnswer, singleDnDBadAnswer {}



function LessonOverview(props: props) {

    useEffect(()=>{
        console.log(props.lessonData.lessonOverview);
    },[])

    return (
        <div className='lesson-overview'>
            <div className='lesson-overview-results'>
            <p className='lesson-overview-title'>These are your results</p>

                <p className='percentage'>Percentage of answers gotten right: {props.lessonData.lessonOverview.goodAnswersArr.length / (props.lessonData.lessonOverview.goodAnswersArr.length + props.lessonData.lessonOverview.badAnswersArr.length) * 100}%</p>
                <p className='wrongQ'>The question/s you have got wrong:</p>
                {props.lessonData.lessonOverview.badAnswersArr.length==0 ? <p className='maxScore'>congratulations on the max score!</p> : null}
                {props.lessonData.lessonOverview.badAnswersArr.map((badAnswer: anyBadAnswer, index: number)=>{
                    if(badAnswer.hasOwnProperty('questionObject') && (badAnswer.questionObject.questionFormat == 'SelectOne' || badAnswer.questionObject.questionFormat == 'SelectMultiple')){
                        // singleSelectBadAnswer type
                        console.log('SELECT')
                        return(
                            <div className='single-badAnswer' key={key.generate()}>
                                <p className='badAnswer-title'>{badAnswer.questionTitle}</p>
                                <div className='answers'>
                                    <p className='wys'>What you selected:</p>
                                    <div className='single-badAnswer-userAnsweredWords'>
                                        {badAnswer.answeredWord.map((singleAnswer: string, i: number)=>{
                                            return(
                                                <p key={key.generate()}>{singleAnswer}</p>
                                            )
                                        })}
                                    </div>
                                    <p className='tca'>The correct answer/s:</p>
                                    <div className='single-badAnswer-correctWords'>
                                        {badAnswer.questionObject.correctAnswer.map((singleAnswer: string, i: number)=>{
                                            return(
                                                <p key={key.generate()}>{singleAnswer}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    } else if(badAnswer.questionFormat=='DragAndDrop'){
                        // singleDnDBadAnswer type
                        console.log('DND');
                        console.log(badAnswer)
                        return(
                            <div className='single-badAnswer' key={parseFloat(badAnswer.title)}>
                                <p className='badAnswer-title'>{badAnswer.title}</p>
                                <div className='answers'>
                                    <p className='wys'>Words given:</p>
                                    <div className='single-badAnswer-userAnsweredWords'>
                                        {badAnswer.possibleAnswers.map((singleAnswer: string, i: number)=>{
                                            return(
                                                <p key={key.generate()}>{singleAnswer}</p>
                                            )
                                        })}
                                    </div>
                                    <p className='tca'>Correct order:</p>
                                    <div className='single-badAnswer-correctWords'>
                                        {badAnswer.correctAnswer.map((singleAnswer: string, i: number)=>{
                                            return(
                                                <p key={key.generate()}>{singleAnswer}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }
            
                })}
                <button className='lesson-overview-backBtn' onClick={()=>{props.lessonData.setLessonOverview(false);props.returnToMain()}}>Back to the main path</button>
            </div>
        </div>
    );
}

export default LessonOverview;