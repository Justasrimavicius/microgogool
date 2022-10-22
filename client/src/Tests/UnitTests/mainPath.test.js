import App from 'src/app';

import {render, screen, waitFor} from '@testing-library/react';
import Content from '../../Components/MainSections/Content';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


describe('main path testing',function(){
    it('content screen correct',async function(){
        await waitFor(async ()=>{
            render(<Content />);
            const sec1 = screen.findByText(/section 1: the start \- simple words/i);
            expect(sec1).toBeTruthy();
        })
    })
    it('able to visit one lesson page, go back and revisit it again',async function(){
        await waitFor(async ()=>{
            render(<Content />);
            userEvent.click(screen.findByTestId('startBtn0'));
            expect((screen.findByText(/question 2: which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i))).toBeTruthy();
            act(()=>{
                userEvent.click(screen.findByRole('button', { name: /go back/i }));
            });
            expect(screen.findByText(/section 1: the start \- simple words/i)).toBeTruthy();
            userEvent.click(screen.findByTestId('startBtn0'));
            expect((screen.findByText(/question 2: which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i))).toBeTruthy();
        })
    })
    it('able to visit one lesson page, go back and visit a different one',async function(){
        await waitFor(async ()=>{
            render(<Content />);
            act(()=>{
                userEvent.click(screen.findByTestId('startBtn0'));
            })
            expect((screen.findByText(/question 2: which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i))).toBeTruthy();
            act(()=>{
                userEvent.click(screen.findByRole('button', { name: /go back/i }));
            });
            expect(screen.findByText(/section 1: the start \- simple words/i)).toBeTruthy();
            act(()=>{
                userEvent.click(screen.findByTestId('startBtn2'));
            })
            expect(screen.findByText(/question 2: which english sentence is the translation of this lithuanian sentence: "ėjau link katedros, kur ir sutikau pijaus mamą\."/i)).toBeTruthy();
        })
    })
})