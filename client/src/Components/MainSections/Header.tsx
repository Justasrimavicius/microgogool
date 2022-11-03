import React, { useState } from 'react';
import UserIconDisplay from '../UserIconDisplay';
import HOC_Overlay from '../HOC_Overlay';

interface props{
    centerPathContentProp:{
        centerPathContent: string,
        loadCenterPathContent: React.Dispatch<React.SetStateAction<string>>
    }
}

function Header(props: props) {

    const [showUserIconDisplay, setShowUserIconDisplay] = useState<boolean>(false);

    let UserIconDisplay_WithOverlay = HOC_Overlay(UserIconDisplay);

    const {centerPathContent, loadCenterPathContent} = props.centerPathContentProp;

    return (
        <React.Fragment>
        <header>
            {/* {showUserIconDisplay==true ? <UserIconDisplay_WithOverlay /> : null} */}
            {showUserIconDisplay==true ? <UserIconDisplay centerPathContentProp={{centerPathContent, loadCenterPathContent}} showUserIconDisplayProp={{setShowUserIconDisplay}}/> : null}
            
            <div className='header-content'>
            <p>Microgoogol</p>
            <div className='header-content-right'>
                <button className='userIcon-button' onClick={()=>{setShowUserIconDisplay(true)}}><img src={require('../../Photos/userIcon.png')} alt='user icon'></img></button>
            </div>
            </div>

            <div className='divider'></div>
        </header>
        </React.Fragment>
    );
}

export default Header;