import React from 'react';

function MistakesTab() {
    return (
        <div className='mistakes-tab'>
            <img src={require('../../Photos/error.png')} alt='error image'></img>
            <p>Mistakes you have recently made</p>
            <div className='mistakes-holder'>
                <div className='mistake'>
                    <p className='mistake-title'>Which one of these 3 words - "clap", "say" or "bake" - means "kepti"?</p>
                    <p className='mistake-userAnswer'>Your answer: clap</p>
                    <p className='mistake-correctAnswer'>Correct answer: bake</p>
                </div>
                <div className='mistake'>
                    <p className='mistake-title'>Which one of these 3 words - "clap", "say" or "bake" - means "kepti"?</p>
                    <p className='mistake-userAnswer'>Your answer: clap</p>
                    <p className='mistake-correctAnswer'>Correct answer: bake</p>
                </div>
                <div className='mistake'>
                    <p className='mistake-title'>Which one of these 3 words - "clap", "say" or "bake" - means "kepti"?</p>
                    <p className='mistake-userAnswer'>Your answer: clap</p>
                    <p className='mistake-correctAnswer'>Correct answer: bake</p>
                </div>
            </div>
        </div>
    );
}

export default MistakesTab;