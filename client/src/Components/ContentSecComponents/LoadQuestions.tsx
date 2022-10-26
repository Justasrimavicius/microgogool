import { type } from 'os';
import React, { useEffect, useRef } from 'react';

interface questionInfoObj{
    correctAnswer: string[],
    possibleAnswers: string[],
    questionFormat: string,
    title: string
}
interface selectedAnswersArrInterface{
    questionTitle: string,
    answeredWord: string[],
    questionObject: any
}
function LoadQuestions(props: any): React.ReactElement | null{
    const questionCounterRef: {current: number} = {
        current: -1
    };

    let lessonNumber = 0;

    const selectedAnswersArr = useRef<selectedAnswersArrInterface[]>([]);

    useEffect(()=>{
        if(props.handleError.errorHandling!=false){
            checkAnswers();
        }
    },[props.handleError.errorHandling])


    function MainCall(): React.ReactElement | undefined{
    if(!props.props.arrayIndividualLessons[questionCounterRef.current]){
        if(questionCounterRef.current>=props.props.arrayIndividualLessons.length)return;
        else {
            questionCounterRef.current++;
            return MainCall();
        }
    } else {
        // still elements left in the array
        if(props.props.arrayIndividualLessons[questionCounterRef.current][1].title){
            // the element (props.props.arrayIndividualLessons[questionsCounterRef.current][1]) is question element - its second array elements contains info about questions
            lessonNumber = props.props.arrayIndividualLessons[questionCounterRef.current][0].slice(6,7);
            if(props.props.arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectOne'){
                return LoadQuestion_SelectOne(props.props.arrayIndividualLessons[questionCounterRef.current][1]);
            }
            if(props.props.arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='SelectMultiple'){
                return LoadQuestion_SelectMultiple(props.props.arrayIndividualLessons[questionCounterRef.current][1]);
            }
            if(props.props.arrayIndividualLessons[questionCounterRef.current][1].questionFormat=='DragAndDrop'){
                return loadQuestion_DragAndDrop(props.props.arrayIndividualLessons[questionCounterRef.current][1]);
            }
        } else {
            questionCounterRef.current++;
            return MainCall();
        }
    }
    }

    function LoadQuestion_SelectOne(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;
        const answersSelectedSO = useRef<HTMLElement[]>([]);

        const possibleAnswersNum = questionInfoObj.correctAnswer.length;

        function answer_SO_Selected(id: string, title: string){
            // clicked element
            const selectedElement = document.getElementById(id);

            if(selectedElement==null){
                return;
            }
            // if user clicks the same answer, remove if from selected answers array and remove its answered class
            if(answersSelectedSO.current.includes(selectedElement)){
                answersSelectedSO.current.map((element,index: number)=>{
                    if(element==selectedElement){
                        answersSelectedSO.current.splice(index,1);
                        selectedElement.classList.remove('singlePossibleAnswer-selected');
                    }
                })
                selectedAnswersArr.current.map((singleAnsweredQuestion: any,index: number)=>{
                    if(title==singleAnsweredQuestion.questionTitle){
                        const wordIndex = singleAnsweredQuestion.answeredWord.indexOf(selectedElement.innerText);
                        singleAnsweredQuestion.answeredWord.splice(wordIndex,1)
                    }
                })
                return;
            }
            // else, push the new clicked value to the array and add the class of selected answer
            answersSelectedSO.current.push(selectedElement);
            selectedElement.classList.add('singlePossibleAnswer-selected');

            // if more than max answers are selected(elements pushed in array), removed the first added element from array and remove its class
            if(answersSelectedSO.current.length>possibleAnswersNum){
                const removedElement = answersSelectedSO.current.shift();
                if(removedElement==null)return;
                removedElement.classList.remove('singlePossibleAnswer-selected');
            }
            const clickedButtonInfo = {
                questionTitle: title,
                answeredWord: [answersSelectedSO.current[answersSelectedSO.current.length-1].id.split('-')[1]],
                questionObject: questionInfoObj
            }
            if(selectedAnswersArr.current.length==0){
                selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo];
            } else{
                for(let index = 0; index < selectedAnswersArr.current.length; index++){
                    if(selectedAnswersArr.current[index].questionTitle==clickedButtonInfo.questionTitle){
                        if(selectedAnswersArr.current[index].questionObject.correctAnswer.length!=selectedAnswersArr.current[index].answeredWord.length){
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                        } else {
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                            selectedAnswersArr.current[index].answeredWord.shift();
                        }
                        return;
                    } else if(index==selectedAnswersArr.current.length-1){
                        selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo]
                    }
                }

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
                        onClick={()=>{answer_SO_Selected(`${index}SO-${singleAnswer}`, questionInfoObj.title)}}
                        >
                        {singleAnswer}</button>
                    )
                })}</div>
            </div>
            {MainCall()}
            </React.Fragment>

        )

    }

    function LoadQuestion_SelectMultiple(questionInfoObj: questionInfoObj){
        const possibleAnswersNum = questionInfoObj.correctAnswer.length;
        const answersSelectedSM = useRef<HTMLElement[]>([]);

        questionCounterRef.current++;

        function answer_SM_Selected(id: string, title: string){
            // clicked element
            const selectedElement = document.getElementById(id);

            if(selectedElement==null){
                return;
            }
            // if user clicks the same answer, remove it from selected answers array and remove its answered class
            if(answersSelectedSM.current.includes(selectedElement)){
                answersSelectedSM.current.map((element,index: number)=>{
                    if(element==selectedElement){
                        answersSelectedSM.current.splice(index,1);
                        selectedElement.classList.remove('singlePossibleAnswer-selected');
                    }
                })
                selectedAnswersArr.current.map((singleAnsweredQuestion: any,index: number)=>{
                    if(title==singleAnsweredQuestion.questionTitle){
                        const wordIndex = singleAnsweredQuestion.answeredWord.indexOf(selectedElement.innerText);
                        singleAnsweredQuestion.answeredWord.splice(wordIndex,1)
                    }
                })
                return;
            }
            // else, push the new clicked value to the array and add the class of selected answer
            answersSelectedSM.current.push(selectedElement);
            selectedElement.classList.add('singlePossibleAnswer-selected');

            // if more than max answers are selected(elements pushed in array), removed the first added element from array and remove its class
            if(answersSelectedSM.current.length>possibleAnswersNum){
                const removedElement = answersSelectedSM.current.shift();
                if(removedElement==null)return;
                removedElement.classList.remove('singlePossibleAnswer-selected');
            }
            const clickedButtonInfo = {
                questionTitle: title,
                answeredWord: [answersSelectedSM.current[answersSelectedSM.current.length-1].id.split('-')[1]],
                questionObject: questionInfoObj
            }
            if(selectedAnswersArr.current.length==0){
                selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo];
            } else{
                for(let index = 0; index < selectedAnswersArr.current.length; index++){
                    if(selectedAnswersArr.current[index].questionTitle==clickedButtonInfo.questionTitle){
                        if(selectedAnswersArr.current[index].questionObject.correctAnswer.length!=selectedAnswersArr.current[index].answeredWord.length){
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                        } else {
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                            selectedAnswersArr.current[index].answeredWord.shift();
                        }
                        return;
                    } else if(index==selectedAnswersArr.current.length-1){
                        selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo]
                    }
                }
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
                            onClick={()=>{answer_SM_Selected(`${index}SM-${singleAnswer}`, questionInfoObj.title)}}
                            >
                            {singleAnswer}</button>
                        )
                    })}</div>
                </div>
                {MainCall()}
            </React.Fragment>

        )
    }

    function loadQuestion_DragAndDrop(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;

        function onDropFunc(e: any){
            e.preventDefault();
            const data = e.dataTransfer.getData("application/my-app");
            e.currentTarget.appendChild(document.getElementById(data));
        }
        function onDragOverFunc(e: any){
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        }
        function ondragstartFunc(e: any){
            
            e.dataTransfer.setData("application/my-app", e.target.id);
            e.dataTransfer.effectAllowed = "move";
        }

        return(
            <React.Fragment>
                <div className='question-DragAndDrop single-question'>
                    <p className='single-question-title'>Question {lessonNumber}: {questionInfoObj.title}</p>
                    <div className='single-question-DragAndDrop-words' onDrop={(e)=>{onDropFunc(e)}} onDragOver={(e)=>{onDragOverFunc(e)}}>{questionInfoObj.possibleAnswers.map((singleWord,index)=>{
                        return(
                            <button className='single-question-DragAndDrop-singleWord'
                            key={`${index}DaD-${singleWord}`}
                            id={`${index}DaD-${singleWord}`}
                            onDragStart={(e)=>{ondragstartFunc(e)}}
                            draggable='true'
                            >
                            {singleWord}
                            </button>
                        )
                    })}</div>
                    <div className='single-question-DragAndDrop-location' onDrop={(e)=>{onDropFunc(e)}} onDragOver={(e)=>{onDragOverFunc(e)}}></div>
                </div>
                {MainCall()}
            </React.Fragment>

        )
    }

    function checkAnswers(){
        const badAnswersArr: object[] = [];
        const goodAnswersArr: object[] = [];

        // firstly check DragAndDrop question if it exists
        if(document.querySelector('.single-question-DragAndDrop-location')){
            let DragAndDropAnswers: any;
            let userDragAndDropAnswers: any = [];
            let pointsForDnD: boolean = true;
            document.querySelectorAll('.single-question-DragAndDrop-location .single-question-DragAndDrop-singleWord').forEach((element: any)=>{
                userDragAndDropAnswers.push(element.innerText)
            });
            const questionObject: any = Object.entries(props.props.arrayIndividualLessons).filter((element: any)=>{
                if(typeof element[1][1] != 'string')return element;
            })
            for(let i = 0; i < questionObject.length; i++){
                if(questionObject[i][1][1].questionFormat=='DragAndDrop'){
                    DragAndDropAnswers = questionObject[i][1];
                    if(!userDragAndDropAnswers){

                    } else if(userDragAndDropAnswers.length!=questionObject[i][1][1].correctAnswer.length){
                        props.handleError.setErrorMessage('You must answer all of the questions.')
                        return;
                    } else {
                        userDragAndDropAnswers.map((element: string,index: number)=>{
                            if(userDragAndDropAnswers[index]!=questionObject[i][1][1].correctAnswer[index]){
                                pointsForDnD=false;
                            }
                            if(index==userDragAndDropAnswers.length-1 && pointsForDnD!=false){
                                pointsForDnD=true;
                                goodAnswersArr.push(DragAndDropAnswers[1])
                            } else if(index == userDragAndDropAnswers.length-1 && pointsForDnD==false){
                                badAnswersArr.push(DragAndDropAnswers[1])
                            }
                        })
                    }

                }
            }
            // if(goodAnswersArr.includes()){
            
        }
        // DnD - DragAndDrop
        const non_DnD_Questions: any = Object.entries(props.props.arrayIndividualLessons).filter((element: any)=>{
            if(typeof element[1][1] != 'string' && element[1][1].questionFormat!='DragAndDrop')return element;
        })
        if(selectedAnswersArr.current.length<non_DnD_Questions.length){
            props.handleError.setErrorMessage('You must answer all of the questions.')
            return;
        }
        selectedAnswersArr.current.map((singleAnsweredQuestion: any,index: number)=>{
            if(singleAnsweredQuestion.questionObject.correctAnswer.length!=singleAnsweredQuestion.answeredWord.length){
                props.handleError.setErrorMessage('You have skipped an answer inside a question.')
                return;

            } else {
                if(index==selectedAnswersArr.current.length-1){

                    // CALCULATE THE CORRECT ANSWERS HERE
                    console.log('answers were selected. Calculating your score for this lesson...')
                    selectedAnswersArr.current.map((element)=>{
                        let isAnswerGood = true;
                        element.answeredWord.map((x,index)=>{
                            if(!element.questionObject.correctAnswer.includes(x)){
                                isAnswerGood = false;
                            }
                            if(index==element.answeredWord.length-1){
                                if(isAnswerGood==true){
                                    goodAnswersArr.push(element)
                                } else {
                                    badAnswersArr.push(element);
                                }
                            }
                        })
                    })
                    // console.log(badAnswersArr);
                    // console.log(goodAnswersArr);
                    console.log('percentage of answers that were correct: ' + (goodAnswersArr.length/badAnswersArr.length * 100).toString().slice(0,5) + '%')

                    return;
                }
            }
        })
    }
    questionCounterRef.current++;
    return(
        <React.Fragment>
        {MainCall()}
        </React.Fragment>
    )
}

export default LoadQuestions;