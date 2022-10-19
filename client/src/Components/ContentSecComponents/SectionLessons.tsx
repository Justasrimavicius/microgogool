import React, { useEffect, useRef, useState } from 'react';

interface props{
    sectionNum: number,
    specificSectionsData: {
        secNum: number, secDescr: string, individualLessons: {
            correctAnswer?: string[],
            possibleAnswers?: string[],
            questionFormat?: string,
            title?: string
        }
    }
}
interface questionInfoObj{
    correctAnswer: string[],
    possibleAnswers: string[],
    questionFormat: string,
    title: string
}

function SectionLessons(props: props) {

    const mainCompRef = useRef<HTMLDivElement>(null);

    const [arrayIndividualLessons, setArrayIndividualLessons] = useState<any>(Object.entries(props.specificSectionsData.individualLessons));

    useEffect(()=>{
        setTimeout(() => {
            if(mainCompRef.current!=null){
                mainCompRef.current.classList.add('lessons-div');
                setTimeout(() => {
                    if(mainCompRef.current!=null){
                        mainCompRef.current.classList.remove('lessons-div-fadeInAnim');
                    }
                }, 2000);
            }   
        }, 100);
    },[]);

    const questionCounterRef = useRef<number>(0);
    function loadQuestions(arrayIndividualLessons: any): React.ReactElement | null{

        if(!arrayIndividualLessons[questionCounterRef.current]){
            console.log('empty lessons')
            return null;
            // no more lessons in the array left
        } else {
            // still elements left in the array
            if(arrayIndividualLessons[questionCounterRef.current][1].title){
                // the element (arrayIndividualLessons[questionsCounterRef.current][1]) is question element - its second array elements contains info about questions
                console.log('this array contains information about the question')
                console.log(arrayIndividualLessons[questionCounterRef.current][1])

                if(arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectOne'){
                    return loadQuestion_SelectOne(arrayIndividualLessons[questionCounterRef.current][1]);
                }
                if(arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectMultiple'){
                    return loadQuestion_SelectMultiple(arrayIndividualLessons[questionCounterRef.current][1]);
                }
                if(arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='DragAndDrop'){
                    return loadQuestion_DragAndDrop(arrayIndividualLessons[questionCounterRef.current][1]);
                }


                
            } else {
                // the elements [1] element is the title of the question(question number is in [0])
                console.log('this array contains the title of the question');
                console.log(arrayIndividualLessons[questionCounterRef.current][1])
                console.log(arrayIndividualLessons[questionCounterRef.current][0])

            }
        }





        questionCounterRef.current++;
        return(
            <React.Fragment>
            {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>
        )
    }

    function loadQuestion_SelectOne(questionInfoObj: questionInfoObj){

        questionCounterRef.current++;
        return(
            <React.Fragment>
            <div className='question-SelectOne single-question'>
                <p className='single-question-title'>{questionInfoObj.title}</p>
                <div className='single-question-possibleAnswers'>{questionInfoObj.possibleAnswers.map((singleAnswer,index)=>{
                    return(
                        <button className='single-question-possibleAnswers-singleAnswer' 
                        key={`${index}SO-${singleAnswer}`}
                        id={`${index}SO-${singleAnswer}`}
                        onClick={()=>{document.getElementById(`${index}SO-${singleAnswer}`)?.classList.add('singlePossibleAnswer-selected')}}
                        >
                        {singleAnswer}</button>
                    )
                })}</div>
            </div>
            {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )

    }
    function loadQuestion_SelectMultiple(questionInfoObj: questionInfoObj){

        questionCounterRef.current++;

        return(
            <React.Fragment>
                <div className='question-SelectMultiple single-question'>
                    <p className='single-question-title'>{questionInfoObj.title}</p>
                    <div className='single-question-possibleAnswers'>{questionInfoObj.possibleAnswers.map((singleAnswer,index)=>{
                        return(
                            <button className='single-question-possibleAnswers-singleAnswer' 
                            key={`${index}SM-${singleAnswer}`}
                            id={`${index}SM-${singleAnswer}`}
                            onClick={()=>{document.getElementById(`${index}SM-${singleAnswer}`)?.classList.add('singlePossibleAnswer-selected')}}
                            >
                            {singleAnswer}</button>
                        )
                    })}</div>
                </div>
                {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )
    }
    function loadQuestion_DragAndDrop(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;

        return(
            <React.Fragment>
                <div className='question-DragAndDrop single-question'>
                    <p className='single-question-title'>{questionInfoObj.title}</p>
                    <div className='single-question-DragAndDrop-words'>{questionInfoObj.possibleAnswers.map((singleWord,index)=>{
                        return(
                            <button className='single-question-DragAndDrop-singleWord'
                            key={`${index}DaD-${singleWord}`}
                            id={`${index}DaD-${singleWord}`}
                            >
                                {singleWord}
                            </button>
                        )
                    })}</div>
                </div>
                {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )
    }




    return (
        <div className='lessons-div-fadeInAnim' ref={mainCompRef}>
            <div className='single-lesson'>
                {loadQuestions(arrayIndividualLessons)}
            </div>
        </div>
    );
}

export default SectionLessons;