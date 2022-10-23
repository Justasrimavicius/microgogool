import React, {useEffect, useRef, useState } from 'react';
import MainPath from '../ContentSecComponents/MainPath';
import MistakesTab from '../ContentSecComponents/MistakesTab';
import ShopTab from '../ContentSecComponents/ShopTab';
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
    
    const [stateForMainPathFade, setStateForMainPathFade] = useState<boolean>(false);

    // mainPath, specificSection, mistakesTab or shopTab
    const [centerPathContent, loadCenterPathContent] = useState<string>('');

    const mainPathRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(sectionNum!=-1){
            if(mainPathRef.current!=null){
                const footer = document.querySelector('footer');
                if(footer)footer.style.opacity='0';
                mainPathRef.current.style.opacity='0';
                console.log('bad footer')
                loadCenterPathContent('specificSection');
                window.scrollTo({top: 0, behavior: 'smooth'});
                setTimeout(() => {
                    if(mainPathRef.current!=null){
                        mainPathRef.current.style.display='none';
                        if(footer)footer.style.display='none';
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
            setStateForMainPathFade(false);

        }

    },[sectionNum]);
    
    useEffect(()=>{
        fetch('http://localhost:8080/sectionsData')
            .then(res=>{
            res.json()
                .then(finalData=>{
                setAllSectionsData(finalData);
                loadCenterPathContent('mainPath');
                })
            })
    },[])

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});

        if(centerPathContent=='mainPath'){
            setStateForMainPathFade(true);
        }
        if(centerPathContent!='specificSection'){
            const footer = document.querySelector('footer');
            if(footer){
                footer.style.display='block';
                setTimeout(() => {
                    footer.style.opacity='1';
                }, 10);
            }
        }
        console.log(centerPathContent)
    },[centerPathContent])

    return (
        <main>
            {centerPathContent!='specificSection' ? <nav className='main-left-nav'>
                {centerPathContent=='mainPath' ? 
                <button className='mainPath-tab-btn tab-btn-selected' onClick={()=>{loadCenterPathContent('mainPath')}}>Main path</button> : 
                <button className='mainPath-tab-btn' onClick={()=>{loadCenterPathContent('mainPath')}}>Main path</button>}
                {centerPathContent=='mistakesTab' ?
                <button className='mistakes-tab-btn tab-btn-selected' onClick={()=>{loadCenterPathContent('mistakesTab')}}>Your mistakes</button> :
                <button className='mistakes-tab-btn' onClick={()=>{loadCenterPathContent('mistakesTab')}}>Your mistakes</button>}
                {centerPathContent=='shopTab' ? 
                <button className='shop-tab-btn tab-btn-selected' onClick={()=>{loadCenterPathContent('shopTab')}}>Shop</button> :
                <button className='shop-tab-btn' onClick={()=>{loadCenterPathContent('shopTab')}}>Shop</button>
                }
            </nav> : null}
            {(centerPathContent=='mainPath' && stateForMainPathFade==true) ? <MainPath sectionLessons={{sectionNum, setSectionNum}} refs={{mainPathRef}} allSectionsDataState={{allSectionsData, setAllSectionsData}}/> : null}
            {centerPathContent=='specificSection' ? <SectionLessons sectionNum={sectionNum} specificSectionsData={specificSectionsData} goBack={{loadCenterPathContent}}/> : null}
            {centerPathContent=='mistakesTab' ? <MistakesTab /> : null}
            {centerPathContent=='shopTab' ? <ShopTab /> : null}
            <div className='main-right'>

            </div>
        </main>
    );
}

export default Content;