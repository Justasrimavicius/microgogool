import React, { useCallback, useEffect, useRef, useState } from 'react';
import ErrorComponent from '../ErrorComponent';
import LoadQuestions from './LoadQuestions';

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
    goBack: {
        loadCenterPathContent: React.Dispatch<React.SetStateAction<string>>
    }
    errorMessage:{
        setErrorMessage: any
    }
}

function SectionLessons(props: props) {

    const lessonsDivRef = useRef<HTMLDivElement>(null);

    const [arrayIndividualLessons, setArrayIndividualLessons] = useState<any>(Object.entries(props.specificSectionsData.individualLessons));

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorHandling, startErrorHandling] = useState<boolean>(false);

    useEffect(()=>{
        setTimeout(() => {
            if(lessonsDivRef.current!=null){
                lessonsDivRef.current.classList.add('lessons-div');
                setTimeout(() => {
                    if(lessonsDivRef.current!=null){
                        lessonsDivRef.current.classList.remove('lessons-div-fadeInAnim');
                    }
                }, 2000);
            }   
        }, 100);


    },[]);

    useEffect(()=>{
        if(errorMessage!=''){
            setTimeout(() => {
                setErrorMessage('');
                startErrorHandling(false);
            }, 2000);
        }
    },[errorMessage])

    function returnToMain(){
        const mainPath = document.querySelector('.main-path') as HTMLElement;
        lessonsDivRef.current?.classList.add('lessons-div-fadeOutAnim');
        lessonsDivRef.current?.classList.remove('lessons-div');
        setTimeout(() => {
            props.goBack.loadCenterPathContent('mainPath');
        }, 1000);
    }

    return (
        <React.Fragment>
            <div className='lessons-div-fadeInAnim' ref={lessonsDivRef}>
                {errorMessage!='' ? <ErrorComponent message={errorMessage} /> : null}
                <div className='single-lesson'>
                <LoadQuestions props={{arrayIndividualLessons}} handleError={{setErrorMessage, startErrorHandling, errorHandling}} />
                    <div className='single-lesson-buttons'>
                        <button className='lesson-answer-submit' onClick={()=>{startErrorHandling(true)}}>Submit the answers</button>
                        <button className='lesson-go-back' onClick={()=>{returnToMain()}}>Go back</button>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default SectionLessons;