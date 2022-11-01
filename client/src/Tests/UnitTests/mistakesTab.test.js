import {cleanup, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import Content from '../../Components/MainSections/Content';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'; 
import MistakesTab from '../../Components/ContentSecComponents/MistakesTab';
import React from 'react';
import UIDContext from '../../UIDContext'


describe('mistakes tab testing',function(){

    // CLEAN DOM HERE
    afterEach(() => {
        cleanup();
      });


    it('no mistakes made',async function(){
        await waitFor(async ()=>{
            // UID of test user with no bad answers
            UID = 'vMKqJiwL1rdWvzFj9LLab53NzE82'
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MistakesTab />
                </UIDContext.Provider>
                );
            
            const noMistakesText = await screen.findByText(/you haven't made any mistakes\. very good! or is it\.\.\?/i)
            expect(noMistakesText).toBeInTheDocument();
        },{timeout: 3000})
    })
    it('some mistakes were made(1 section)',async function(){
        await waitFor(async ()=>{
            // UID of test user with mistakes in 1 section
            UID = 'b4ElVF8C2dV4See4Wg1R2ZULYVC2'
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MistakesTab />
                </UIDContext.Provider>
                );

            const mistakeTitle = await screen.findByText(/which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i);
            expect(mistakeTitle).toBeInTheDocument();

            const allSelectQuestions = await screen.findAllByText(/the correct answer\/s:/i);
            expect(allSelectQuestions).toHaveLength(3);

            const allDnDQuestions = await screen.findAllByText(/correct order:/i);
            expect(allDnDQuestions).toHaveLength(1);
        },{timeout: 3000})
    })
    it('some mistakes were made(multiple sections)',async function(){
        await waitFor(async ()=>{
            // UID of test user with mistakes in multiple sections
            UID = 'ye18TMb8DaXh4e5tTj8g3UESLA22';
            render(
                <UIDContext.Provider value={{UID,function(){return 0}}} >
                    <MistakesTab />
                </UIDContext.Provider>
                );
            const mistakeTitle = await screen.findByText(/which english sentence is the translation of this lithuanian sentence: "ėjau link katedros, kur ir sutikau pijaus mamą\."/i)
            expect(mistakeTitle).toBeInTheDocument();

            const allSelectQuestions = await screen.findAllByText(/the correct answer\/s:/i);
            expect(allSelectQuestions).toHaveLength(2);

            const allDnDQuestions = await screen.findAllByText(/correct order:/i);
            expect(allDnDQuestions).toHaveLength(1);

        },{timeout: 3000})
    })
})