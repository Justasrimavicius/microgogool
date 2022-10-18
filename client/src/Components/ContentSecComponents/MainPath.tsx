import React, { useEffect, useState } from 'react';


interface sectionDataI{
    secNum: number,
    secDescr: string,
    individualLessons: {
        [key: string]: string
    }
}

function MainPath() {

    const [sectionData, setSectionData] = useState<Array<sectionDataI>>([{secNum: 1, secDescr: 'axo', individualLessons: {}}]);

    useEffect(()=>{
        fetch('http://localhost:8080/sectionsData')
          .then(res=>{
            res.json()
              .then(finalData=>{
                setSectionData(finalData);
            })
          })
    },[])

    useEffect(()=>{
        // console.log(sectionData)

    },[sectionData])

    return (
        <div className='main-path'>
            {sectionData.map((singleSection,index)=>{
                // console.log(singleSection)
                return(
                <div className={`section-${singleSection.secNum}`} key={`${index}`}>
                    <div className='section-name-div'>
                        <p>section {singleSection.secNum}: {singleSection.secDescr}</p>
                        <button>Start</button>
                    </div>
                    <div className='sections-lesson'>
                    {
                        Object.entries(singleSection.individualLessons).map(singleLesson=>{
                            if(typeof(singleLesson[1]) !== 'string')return;
                            return(
                                <button><p>Lesson {singleLesson[0].slice(6,7)}: {singleLesson[1]}</p></button>
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