import React from 'react';

function ShopTab() {
    return (
        <div className='shop-tab'>
            <img src={require(`../../Photos/shopping-cart.png`)} alt='shopping cart icon'></img>
            <p>Spend your daily streak points here!</p>
            <p style={{fontSize:'2.5rem', textAlign:'center'}}>TAB IS UNDER CONSTRUCTION</p>
            <div className='shop'>
                <div className='shop-perk'>
                    <div className='shop-perk-upper'>
                        <img src={require(`../../Photos/double-point.png`)} alt='double points icon'></img>
                        <p className='perk-title'>Doubly-pointy</p>
                    </div>
                    <div className='shop-perk-lower'>
                        <p className='perk-description'>Double points - double the points that you get from your next lesson.</p>
                        <button>Buy(2SP)</button>
                    </div>
                </div>
                <div className='shop-perk'>
                    <div className='shop-perk-upper'>
                        <img src={require(`../../Photos/skip.png`)} alt='skip lesson icon'></img>
                        <p className='perk-title'>Lesson skipper</p>
                    </div>
                    <div className='shop-perk-lower'>
                        <p className='perk-description'>lesson skip - skip the next lesson.</p>
                        <button>Buy(1SP)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopTab;