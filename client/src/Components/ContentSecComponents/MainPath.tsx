import React from 'react';

function MainPath() {

    const sections = [
        {
            secNum:1,
            secDescr:'The start - simple words',
        },
        {
            secNum:2,
            secDescr:'Easy and short sentences, situational words',
        },
        {
            secNum:3,
            secBYBYSDescr:'Real world sentence applications',
        }
    ]

    return (
        <div className='main-path'>
            <div className='main-section'></div>
 
        </div>
    );
}

export default MainPath;