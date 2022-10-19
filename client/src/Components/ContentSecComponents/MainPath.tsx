import React, { LegacyRef, useEffect, useState } from 'react';

interface allSectionsData{
    secNum: number,
    secDescr: string,
    individualLessons: {
        [key: string]: string
    }
}
interface props{
    sectionLessons: {
        sectionNum: number,
        setSectionNum: React.Dispatch<React.SetStateAction<number>>
    },
    refs: {mainPathRef: LegacyRef<HTMLDivElement>}
    allSectionsDataState:{
    allSectionsData: any,
    setAllSectionsData: React.Dispatch<React.SetStateAction<allSectionsData[]>>
    }
}

function MainPath(props: props) {

    const [allSectionsData, setAllSectionsData] = useState<allSectionsData[]>(props.allSectionsDataState.allSectionsData);

    return (
        <div className='main-path' ref={props.refs.mainPathRef}>
            {allSectionsData.map((singleSection,index)=>{
                return(
                <div className={`section-${singleSection.secNum}`} key={`${index}`}>
                    <div className='section-name-div'>
                        <p>section {singleSection.secNum}: {singleSection.secDescr}</p>
                        <button onClick={()=>{props.sectionLessons.setSectionNum(singleSection.secNum)}}>Start</button>
                    </div>
                    <div className='sections-lesson'>
                    {
                        Object.entries(singleSection.individualLessons).map((singleLesson,lessonIndex)=>{
                            if(typeof(singleLesson[1]) !== 'string')return;
                            return(
                                <button key={`${lessonIndex}-btn`}><p>Lesson {singleLesson[0].slice(6,7)}: {singleLesson[1]}</p></button>
                            )
                        })
                    }
                    </div>
                </div>)
            })}
        </div>
    );
}

export default MainPath;