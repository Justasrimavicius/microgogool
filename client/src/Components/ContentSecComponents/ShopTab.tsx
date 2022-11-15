import React, { ElementType, useContext, useEffect, useState } from 'react';

import UIDContext from 'src/UIDContext';
import link from 'src/xhrLink';

function ShopTab() {

    const [userPoints, setUserPoints] = useState<number>(0);
    const [purchaseResponse, setPurchaseResponse] = useState<string>('');

    const { UID, setUID } = useContext(UIDContext);

    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${link}/getUserPoints`, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID
        }));

        xhr.onload = ()=>{
            console.log(xhr.responseText)
            const parsedResponse = JSON.parse(xhr.responseText);
            setUserPoints(parsedResponse);
        }
    },[])

    function buyPerk(perkName: string){
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${link}/buyPerk`, true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            UID: UID,
            perkName: perkName
        }));

        xhr.onload = ()=>{
            const parsedResponse = JSON.parse(xhr.responseText);
            console.log(parsedResponse);
            if(parsedResponse.perk){
                setUserPoints(parsedResponse.UPafterPurchase);
                setPurchaseResponse(parsedResponse.perk+' has been purchased!');
            } else if(parsedResponse=='Not enough UserPoints'){
                setPurchaseResponse(parsedResponse);
            } else if(parsedResponse=='You already own this perk!'){
                setPurchaseResponse(parsedResponse);
            }
        }
    }
    useEffect(()=>{
        if(purchaseResponse!=''){
            setTimeout(() => {
                setPurchaseResponse('');
            }, 3000);
        }
    },[purchaseResponse])


    return (
        <>
            <div className='shop-tab'>
                <img src={require(`../../Photos/shopping-cart.png`)} alt='shopping cart icon'></img>
                <p>Spend your daily streak points here!</p>
                <p>Your UserPoints: <strong style={{color:'gold'}}>{userPoints}</strong></p>
                <div className='shop'>
                    {purchaseResponse!='' ? <p style={{color:'gold', fontSize:'1.3rem'}}>{purchaseResponse}</p> : null}
                    <div className='shop-perk'>
                        <div className='shop-perk-upper'>
                            <img src={require(`../../Photos/double-point.png`)} alt='double points icon'></img>
                            <p className='perk-title'>Doubly-pointy</p>
                        </div>
                        <div className='shop-perk-lower'>
                            <p className='perk-description'>Double points - double the points that you get from your next lesson.</p>
                            <button onClick={()=>{buyPerk('Doubly-pointy')}}>Buy(2UP)</button>
                        </div>
                    </div>
                    {/* <div className='shop-perk'>
                        <div className='shop-perk-upper'>
                            <img src={require(`../../Photos/skip.png`)} alt='skip lesson icon'></img>
                            <p className='perk-title'>Lesson skipper</p>
                        </div>
                        <div className='shop-perk-lower'>
                            <p className='perk-description'>lesson skip - skip the next lesson.</p>
                            <button onClick={()=>{buyPerk('Lesson skipper')}}>Buy(1UP)</button>
                        </div>
                    </div> */}
                    <p style={{fontSize:'2rem'}}>More perks on the way!</p>
                </div>
            </div>
        </>
    );
}

export default ShopTab;