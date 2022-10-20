import React, {useEffect, useRef, useState } from 'react';
import MainPath from '../ContentSecComponents/MainPath';
import SectionLessons from '../ContentSecComponents/SectionLessons';

interface allSectionsData{
    secNum: number,
    secDescr: string,
    individualLessons: {
        [key: string]: string
    }
}

function Content() {
    const [sectionNum, setSectionNum] = useState<number>(-1); // user chooses section in MainPath to go through the lessons. This useState loads the approriate sections lessons
    const [allSectionsData, setAllSectionsData] = useState<allSectionsData[]>([{secNum: -1, secDescr: '', individualLessons: {}}]);
    const [specificSectionsData, setSpecificSectionsData] = useState<{secNum: number, secDescr: string, individualLessons: {[key: string]: string}}>({secNum: -1, secDescr: '',individualLessons: {'something': 'something else'}});
    const [specificSection, loadSpecificSection] = useState<boolean>(false);
    
    const mainPathRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(sectionNum!=-1){
            if(mainPathRef.current!=null){ // checks for typescript
                mainPathRef.current.style.opacity='0';
                setTimeout(() => {
                    if(mainPathRef.current!=null){
                        mainPathRef.current.style.display='none';
                        const footer = document.querySelector('footer');
                        if(footer){
                            footer.style.opacity='0';
                            footer.style.visibility='hidden';
                        }
                        loadSpecificSection(true);
                    }
                }, 500);
            }

            if(allSectionsData!=null){
                allSectionsData.map(specificSection=>{
                    if(specificSection.secNum==sectionNum){
                        setSpecificSectionsData(specificSection);
                    }
                })
            }
        }

    },[sectionNum])
    useEffect(()=>{
        fetch('http://localhost:8080/sectionsData')
            .then(res=>{
            res.json()
                .then(finalData=>{
                setAllSectionsData(finalData);
                })
            })
    },[])

    useEffect(()=>{
        if(specificSection!=true){
            if(mainPathRef.current!=null){
                mainPathRef.current.style.opacity='1';
                mainPathRef.current.style.display='block';
                const footer = document.querySelector('footer');
                if(footer){
                    footer.style.opacity='1';
                    footer.style.visibility='visible';
                }
            }
        }
    },[specificSection])

    return (
        <main>
            <nav className='main-left-nav'>

            </nav>
            {allSectionsData.length!= 1 ? <MainPath sectionLessons={{sectionNum, setSectionNum}} refs={{mainPathRef}} allSectionsDataState={{allSectionsData, setAllSectionsData}}/> : null}
            {specificSection!=false ? <SectionLessons sectionNum={sectionNum} specificSectionsData={specificSectionsData} goBack={{loadSpecificSection}}/> : null}
            <div className='main-right'>

            </div>
        </main>
    );
}

export default Content;