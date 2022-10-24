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
        loadCenterPathContent: React.Dispatch<React.SetStateAction<string>>
    }
}
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
function SectionLessons(props: props) {

    const lessonsDivRef = useRef<HTMLDivElement>(null);

    const [arrayIndividualLessons, setArrayIndividualLessons] = useState<any>(Object.entries(props.specificSectionsData.individualLessons));
    const selectedAnswersArr = useRef<selectedAnswersArrInterface[]>([]);

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
            return null;
            // no more lessons in the array left
        } else {
            // still elements left in the array
            if(arrayIndividualLessons[questionCounterRef.current][1].title){
                // the element (arrayIndividualLessons[questionsCounterRef.current][1]) is question element - its second array elements contains info about questions
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


        function answer_SO_Selected(id: string, title: string){
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
                selectedAnswersArr.current.map((singleAnsweredQuestion,index)=>{
                    if(title==singleAnsweredQuestion.questionTitle){
                        const wordIndex = singleAnsweredQuestion.answeredWord.indexOf(selectedElement.innerText);
                        console.log(wordIndex)
                        singleAnsweredQuestion.answeredWord.splice(wordIndex,1)
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
            const clickedButtonInfo = {
                questionTitle: title,
                answeredWord: [answersSelected.current[answersSelected.current.length-1].id.split('-')[1]],
                questionObject: questionInfoObj
            }
            if(selectedAnswersArr.current.length==0){
                selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo];
                console.log(selectedAnswersArr.current);

            } else{
                for(let index = 0; index < selectedAnswersArr.current.length; index++){
                    console.log(selectedAnswersArr.current[index].questionTitle);
                    console.log(clickedButtonInfo.questionTitle);
                    console.log('-----')
                    if(selectedAnswersArr.current[index].questionTitle==clickedButtonInfo.questionTitle){
                        if(selectedAnswersArr.current[index].questionObject.correctAnswer.length!=selectedAnswersArr.current[index].answeredWord.length){
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                        } else {
                            selectedAnswersArr.current[index].answeredWord.push(clickedButtonInfo.answeredWord[0]);
                            selectedAnswersArr.current[index].answeredWord.shift();
                        }
                        console.log(selectedAnswersArr.current);
                        return;
                    } else if(index==selectedAnswersArr.current.length-1){
                        selectedAnswersArr.current=[...selectedAnswersArr.current, clickedButtonInfo]
                        console.log(selectedAnswersArr.current);
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
            {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )

    }
    function LoadQuestion_SelectMultiple(questionInfoObj: questionInfoObj){
        questionCounterRef.current++;

        const answersSelected = useRef<HTMLElement[]>([]);

        const possibleAnswersNum = questionInfoObj.correctAnswer.length;


        function answer_SM_Selected(id: string, title: string){
            // clicked element
            const selectedElement = document.getElementById(id);

            if(selectedElement==null){
                return;
            }
            // if user clicks the same answer, remove it from selected answers array and remove its answered class
            if(answersSelected.current.includes(selectedElement)){
                answersSelected.current.map((element,index)=>{
                    if(element==selectedElement){
                        answersSelected.current.splice(index,1);
                        selectedElement.classList.remove('singlePossibleAnswer-selected');
                    }
                })
                selectedAnswersArr.current.map((singleAnsweredQuestion,index)=>{
                    if(title==singleAnsweredQuestion.questionTitle){
                        const wordIndex = singleAnsweredQuestion.answeredWord.indexOf(selectedElement.innerText);
                        console.log(wordIndex)
                        singleAnsweredQuestion.answeredWord.splice(wordIndex,1)
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
            const clickedButtonInfo = {
                questionTitle: title,
                answeredWord: [answersSelected.current[answersSelected.current.length-1].id.split('-')[1]],
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

                console.log(selectedAnswersArr.current);

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
                {loadQuestions(arrayIndividualLessons)}
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
                {loadQuestions(arrayIndividualLessons)}
            </React.Fragment>

        )
    }


    function returnToMain(){
        const mainPath = document.querySelector('.main-path') as HTMLElement;
        lessonsDivRef.current?.classList.add('lessons-div-fadeOutAnim');
        lessonsDivRef.current?.classList.remove('lessons-div');
        setTimeout(() => {
            props.goBack.loadCenterPathContent('mainPath');
        }, 1000);
    }

    function checkAnswers(){
        // firstly check DragAndDrop question if it exists
        if(document.querySelector('.single-question-DragAndDrop-location')){
            let DragAndDropAnswers;
            let userDragAndDropAnswers: any = [];
            let DnDpoints: string = '';
            document.querySelectorAll('.single-question-DragAndDrop-location .single-question-DragAndDrop-singleWord').forEach((element: any)=>{
                userDragAndDropAnswers.push(element.innerText)
            });
            

            const questionObject: any = Object.entries(props.specificSectionsData.individualLessons).filter(element=>{
                if(typeof element[1] != 'string')return element;
            })
            
            for(let i = 0; i < questionObject.length; i++){
                if(questionObject[i][1].questionFormat=='DragAndDrop'){
                    DragAndDropAnswers = questionObject[i][1];
                    if(!userDragAndDropAnswers){
                        console.log('lmao noob cant do the drag and drop. NOT ALL ANSWERS SELECTED');
                    } else if(userDragAndDropAnswers.length!=questionObject[i][1].correctAnswer.length){
                        console.log('NOT ALL ANSWERS SELECTED');
                    } else {
                        console.log(userDragAndDropAnswers)
                        console.log(questionObject[i][1].correctAnswer)
                        userDragAndDropAnswers.map((element: string,index: number)=>{
                            if(userDragAndDropAnswers[index]!=questionObject[i][1].correctAnswer[index]){
                                DnDpoints='NO POINTS FOR DND'
                            }
                            if(index==userDragAndDropAnswers.length-1 && DnDpoints!='NO POINTS FOR DND'){
                                DnDpoints='++POINTS FOR DND';
                            }
                        })
                        console.log(DnDpoints)
                    }

                }
            }
            
        }

        selectedAnswersArr.current.map((singleAnsweredQuestion,index: number)=>{
            if(singleAnsweredQuestion.questionObject.correctAnswer.length!=singleAnsweredQuestion.answeredWord.length){
                console.log('NOT ALL ANSWERS SELECTED');
            } else {
                console.log('ALL ANSWERS WERE SELECTED')
            }
        })
        console.log(selectedAnswersArr.current);
    }


    return (
        <div className='lessons-div-fadeInAnim' ref={lessonsDivRef}>
            <div className='single-lesson'>
                {loadQuestions(arrayIndividualLessons)}
            <div className='single-lesson-buttons'>
                <button className='lesson-answer-submit' onClick={()=>{checkAnswers()}}>Submit the answers</button>
                <button className='lesson-go-back' onClick={()=>{returnToMain()}}>Go back</button>
            </div>
            </div>
        </div>
    );
}

export default SectionLessons;