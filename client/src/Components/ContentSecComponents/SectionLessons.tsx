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
                
            } else {
                // the elements [1] element is the title of the question(question number is in [0])
                console.log('this array contains the title of the question');
                console.log(arrayIndividualLessons[questionCounterRef.current][1])

            }
        }





        questionCounterRef.current++;
        return(
            <React.Fragment>
            <div className='x'>

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