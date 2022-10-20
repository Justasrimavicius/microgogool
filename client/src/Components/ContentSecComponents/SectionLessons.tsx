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
    goBack: {
        loadSpecificSection: React.Dispatch<React.SetStateAction<boolean>>
    }
}
interface questionInfoObj{
    correctAnswer: string[],
    possibleAnswers: string[],
    questionFormat: string,
    title: string
}

function SectionLessons(props: props) {

    const lessonsDivRef = useRef<HTMLDivElement>(null);

    const [arrayIndividualLessons, setArrayIndividualLessons] = useState<any>(Object.entries(props.specificSectionsData.individualLessons));

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

    let lessonNumber = 0;
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
                lessonNumber = arrayIndividualLessons[questionCounterRef.current][0].slice(6,7);
                if(arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectOne'){
                    return LoadQuestion_SelectOne(arrayIndividualLessons[questionCounterRef.current][1]);
                }
                if(arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectMultiple'){
                    return LoadQuestion_SelectMultiple(arrayIndividualLessons[questionCounterRef.current][1]);
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

    function LoadQuestion_SelectOne(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;

        const answersSelected = useRef<HTMLElement[]>([]);

        const possibleAnswersNum = questionInfoObj.correctAnswer.length;


        function answer_SO_Selected(id: string){
        // document.getElementById(`${index}SM-${singleAnswer}`)?.classList.add('singlePossibleAnswer-selected')

            // clicked element
            const selectedElement = document.getElementById(id);

            if(selectedElement==null){
                return;
            }
            // if user clicks the same answer, remove if from selected answers array and remove its answered class
            if(answersSelected.current.includes(selectedElement)){
                answersSelected.current.map((element,index)=>{
                    if(element==selectedElement){
                        answersSelected.current.splice(index,1);
                        selectedElement.classList.remove('singlePossibleAnswer-selected');
                    }
                })
                return;
            }
            // else, push the new clicked value to the array and add the class of selected answer
            answersSelected.current.push(selectedElement);
            selectedElement.classList.add('singlePossibleAnswer-selected');

            // if more than max answers are selected(elements pushed in array), removed the first added element from array and remove its class
            if(answersSelected.current.length>possibleAnswersNum){
                const removedElement = answersSelected.current.shift();
                if(removedElement==null)return;
                removedElement.classList.remove('singlePossibleAnswer-selected');
            }
        }

        questionCounterRef.current++;
        return(
            <React.Fragment>
            <div className='question-SelectOne single-question'>
                <p className='single-question-title'>Question {lessonNumber}: {questionInfoObj.title}<br></br><em>{questionInfoObj.correctAnswer.length} possible answer/s</em></p>
                <div className='single-question-possibleAnswers'>{questionInfoObj.possibleAnswers.map((singleAnswer,index)=>{
                    return(
                        <button className='single-question-possibleAnswers-singleAnswer' 
                        key={`${index}SO-${singleAnswer}`}
                        id={`${index}SO-${singleAnswer}`}
                        // onClick={()=>{document.getElementById(`${index}SO-${singleAnswer}`)?.classList.add('singlePossibleAnswer-selected')}}
                        onClick={()=>{answer_SO_Selected(`${index}SO-${singleAnswer}`)}}
                        >
                        {singleAnswer}</button>
                    )
                })}</div>
            </div>
            {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )

    }
    function LoadQuestion_SelectMultiple(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;

        const answersSelected = useRef<HTMLElement[]>([]);

        const possibleAnswersNum = questionInfoObj.correctAnswer.length;


        function answer_SM_Selected(id: string){
        // document.getElementById(`${index}SM-${singleAnswer}`)?.classList.add('singlePossibleAnswer-selected')

            // clicked element
            const selectedElement = document.getElementById(id);

            if(selectedElement==null){
                return;
            }
            // if user clicks the same answer, remove if from selected answers array and remove its answered class
            if(answersSelected.current.includes(selectedElement)){
                answersSelected.current.map((element,index)=>{
                    if(element==selectedElement){
                        answersSelected.current.splice(index,1);
                        selectedElement.classList.remove('singlePossibleAnswer-selected');
                    }
                })
                return;
            }
            // else, push the new clicked value to the array and add the class of selected answer
            answersSelected.current.push(selectedElement);
            selectedElement.classList.add('singlePossibleAnswer-selected');

            // if more than max answers are selected(elements pushed in array), removed the first added element from array and remove its class
            if(answersSelected.current.length>possibleAnswersNum){
                const removedElement = answersSelected.current.shift();
                if(removedElement==null)return;
                removedElement.classList.remove('singlePossibleAnswer-selected');
            }
        }

        return(
            <React.Fragment>
                <div className='question-SelectMultiple single-question'>
                    <p className='single-question-title'>Question {lessonNumber}: {questionInfoObj.title}<br></br><em>{questionInfoObj.correctAnswer.length} possible answer/s</em></p>
                    <div className='single-question-possibleAnswers'>{questionInfoObj.possibleAnswers.map((singleAnswer,index)=>{
                        return(
                            <button className='single-question-possibleAnswers-singleAnswer' 
                            key={`${index}SM-${singleAnswer}`}
                            id={`${index}SM-${singleAnswer}`}
                            onClick={()=>{answer_SM_Selected(`${index}SM-${singleAnswer}`)}}
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
                    <p className='single-question-title'>Question {lessonNumber}: {questionInfoObj.title}</p>
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


    function returnToMain(){
        const mainPath = document.querySelector('.main-path') as HTMLElement;
        console.log(lessonsDivRef.current);
        lessonsDivRef.current?.classList.add('lessons-div-fadeOutAnim');
        lessonsDivRef.current?.classList.remove('lessons-div');
        setTimeout(() => {
            props.goBack.loadSpecificSection(false);
        }, 1000);
    }


    return (
        <div className='lessons-div-fadeInAnim' ref={lessonsDivRef}>
            <div className='single-lesson'>
                {loadQuestions(arrayIndividualLessons)}
            <div className='single-lesson-buttons'>
                <button className='lesson-answer-submit'>Submit the answers</button>
                <button className='lesson-go-back' onClick={()=>{returnToMain()}}>Go back</button>
            </div>
            </div>
        </div>
    );
}

export default SectionLessons;