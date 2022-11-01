import {cleanup, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'; 
import React from 'react';

import MainRightScore from '../../Components/ContentSecComponents/MainRightScore';
import UIDContext from '../../UIDContext';

describe('score display component testing',function(){

    // CLEAN DOM HERE
    afterEach(() => {
        cleanup();
      });


    it('displays low score(<50%)',async function(){
        await waitFor(async ()=>{
            // UID of test user with no bad answers
            UID = 'b4ElVF8C2dV4See4Wg1R2ZULYVC2'
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MainRightScore />
                </UIDContext.Provider>
                );
            
            const score = await screen.findByTestId('main-right-score-title');
            expect(score.innerHTML).toEqual('You have gotten 20% of the questions right.');
            const scoreText = await screen.findByText(/you can do better\.\./i);
            expect(scoreText).toBeInTheDocument();
        },{timeout: 3000})
    })
    it('displays high score(>50%)',async function(){
        await waitFor(async ()=>{
            // UID of test user with no bad answers
            UID = 'vMKqJiwL1rdWvzFj9LLab53NzE82'
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MainRightScore />
                </UIDContext.Provider>
                );
            
            const score = await screen.findByTestId('main-right-score-title');
            expect(score.innerHTML).toEqual('You have gotten 100% of the questions right.');
            const scoreText = await screen.findByText(/You got some knowledge!/i);
            expect(scoreText).toBeInTheDocument();
        },{timeout: 3000})
    })
    it('displays no score(no lessons done)',async function(){
        await waitFor(async ()=>{
            // UID of test user with no bad answers
            UID = 'PkOz0Y8IAMYwrbCHfmiVAEZ7hor2'
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MainRightScore />
                </UIDContext.Provider>
                );
            
            const score = await screen.findByTestId('main-right-score-title');
            expect(score.innerHTML).toEqual('Your score');
            const scoreText = await screen.findByText(/finish a lesson to see your score!/i);
            expect(scoreText).toBeInTheDocument();
        },{timeout: 3000})
    })
    
})