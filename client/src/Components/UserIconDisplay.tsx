import React, { useContext } from 'react';
import UIDContext from 'src/UIDContext';

interface props{
    centerPathContentProp:{
        centerPathContent: string,
        loadCenterPathContent: React.Dispatch<React.SetStateAction<string>>
    }
    showUserIconDisplayProp:{
        setShowUserIconDisplay: React.Dispatch<React.SetStateAction<boolean>>
    }
}

function UserIconDisplay(props: props) {
    const { UID, setUID } = useContext(UIDContext);



    return (
        <div className='UserIconDisplay'>
            <p>User id: <em>{UID}</em> </p>
            <button onClick={()=>{window.location.reload()}}>Log out</button>
            <button onClick={()=>{props.centerPathContentProp.loadCenterPathContent('mistakesTab'); props.showUserIconDisplayProp.setShowUserIconDisplay(false)}}>Your mistakes</button>
        </div>
    );
}

export default UserIconDisplay;