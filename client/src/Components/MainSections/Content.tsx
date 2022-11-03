import React, {useContext, useEffect, useRef, useState } from 'react';
import MainPath from '../ContentSecComponents/MainPath';
import MistakesTab from '../ContentSecComponents/MistakesTab';
import ShopTab from '../ContentSecComponents/ShopTab';
import SectionLessons from '../ContentSecComponents/SectionLessons';
import MainRightScore from '../ContentSecComponents/MainRightScore';
import MainRightDailyStreak from '../ContentSecComponents/MainRightDailyStreak';
import LoadingScreen from '../LoadingScreen';

import UIDContext from '../../UIDContext';

interface allSectionsData{
    secNum: number,
    secDescr: string,
    individualLessons: {
        [key: string]: string
    }
}

function Content() {
    const { UID, setUID } = useContext(UIDContext);

    const [sectionNum, setSectionNum] = useState<number>(-1); // user chooses section in MainPath to go through the lessons. This useState loads the approriate sections lessons
    const [allSectionsData, setAllSectionsData] = useState<allSectionsData[]>([{secNum: -1, secDescr: '', individualLessons: {}}]);
    const [specificSectionsData, setSpecificSectionsData] = useState<{secNum: number, secDescr: string, individualLessons: {[key: string]: string}}>({secNum: -1, secDescr: '',individualLessons: {'something': 'something else'}});
    
    const [stateForMainPathFade, setStateForMainPathFade] = useState<boolean>(false);

    // mainPath, specificSection, mistakesTab or shopTab
    
    const [centerPathContent, loadCenterPathContent] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<any>('');


    const dailyStreak = useRef<number>(0);

    const mainPathRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/updateDailyStreak', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID
        }));
    },[])

    useEffect(()=>{
        if(sectionNum!=-1){
            if(mainPathRef.current!=null){
                const footer = document.querySelector('footer');
                if(footer){
                    footer.style.opacity='0';
                    footer.style.visibility='hidden';
                }
                mainPathRef.current.style.opacity='0';
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
                footer.style.visibility='visible';
                setTimeout(() => {
                    footer.style.opacity='1';
                }, 10);
            }
        }
    },[centerPathContent])

    return (
        <>
        <LoadingScreen />
        <main>
            {errorMessage}
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
            {centerPathContent=='specificSection' ? <SectionLessons sectionNum={sectionNum} specificSectionsData={specificSectionsData} goBack={{loadCenterPathContent}} errorMessage={{setErrorMessage}}/> : null}
            {centerPathContent=='mistakesTab' ? <MistakesTab /> : null}
            {centerPathContent=='shopTab' ? <ShopTab /> : null}
            {centerPathContent!='specificSection' ? 
            <div className='main-right'>
                <MainRightScore />
                <MainRightDailyStreak />
            </div> : null}
            {centerPathContent!='specificSection' ? <div className='footer-mobile'>
            {centerPathContent=='mainPath' ?
            <button className='tab-btn-selected' onClick={()=>{loadCenterPathContent('mainPath')}}><img src={require('../../Photos/mainPathIcon.png')} alt='main path icon'></img></button> :
            <button onClick={()=>{loadCenterPathContent('mainPath')}}><img src={require('../../Photos/mainPathIcon.png')} alt='main path icon'></img></button>}

            {centerPathContent=='mistakesTab' ?
            <button className='tab-btn-selected' onClick={()=>{loadCenterPathContent('mistakesTab')}}><img src={require('../../Photos/mistakesIcon.png')} alt='mistakes icon'></img></button> :
            <button onClick={()=>{loadCenterPathContent('mistakesTab')}}><img src={require('../../Photos/mistakesIcon.png')} alt='mistakes icon'></img></button>}

            {centerPathContent=='shopTab' ?
            <button className='tab-btn-selected' onClick={()=>{loadCenterPathContent('shopTab')}}><img src={require('../../Photos/shopIcon.png')} alt='shop icon'></img></button> :
            <button onClick={()=>{loadCenterPathContent('shopTab')}}><img src={require('../../Photos/shopIcon.png')} alt='shop icon'></img></button>}

        </div> : null}
        </main>
        </>
    );
}

export default Content;