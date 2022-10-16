import App from '../../App';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';

import app from '../../../../server/firebase';
import { act } from 'react-dom/test-utils';


describe.skip('signup functionality works properly',function(){

    beforeEach(()=>{
        render(<App />);
    })
    it('loads signup tab from the starting view',async function(){
        await waitFor(async ()=>{
            await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

            expect(screen.getByText(/repeat email:/i)).toBeTruthy();
        })
    })
    it('signup flow with matching email/repeat email and password/repeat password values',async function(){
        await waitFor(async ()=>{
            await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
            
            const email = 'tuomis@gmail.com';
            const password = 'Tuomis123';

            await userEvent.type(screen.getByLabelText('Email:'),email);
            await userEvent.type(screen.getByLabelText('Repeat email:'),email);

            await userEvent.type(screen.getByLabelText('Password:'),password);
            await userEvent.type(screen.getByLabelText('Repeat password:'),password);
            act(()=>{fireEvent.click(screen.getByRole('button', { name: /sign up/i }))});

            const auth = getAuth(app);
            let isErrThrown = false;
            act(()=>{createUserWithEmailAndPassword(auth,email,password)
              .then(res=>{
                // in this scneario, this .then is an error - it shouldnt reach this part of the code(unless the email changes in this test)
                isErrThrown = true;
              })
              .catch(err=>{
                // should catch an error for this scenario - testing email is the same, so it already exists in the database, therefore it should throw an error
                // saying that it already exists
                expect(err.code).toEqual('auth/email-already-in-use');
              })
            })
            if(isErrThrown)expect(2).toEqual(1);
        })
    })
    it('signup with different email/repeat email', async function(){

        await waitFor(async ()=>{
            await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

            const email = 'tuomisis@gmail.com';
            const password = 'Tuomis123';

            await userEvent.type(screen.getByLabelText('Email:'),email);
            await userEvent.type(screen.getByLabelText('Repeat email:'),email+'x');

            await userEvent.type(screen.getByLabelText('Password:'),password);
            await userEvent.type(screen.getByLabelText('Repeat password:'),password);

            act(()=>{fireEvent.click(screen.getByRole('button', { name: /sign up/i }))});
            expect(screen.getByText(`emails don't match`)).toBeTruthy();
        })
    })
    it('signup with different password/repeat password', async function(){
        await waitFor(async ()=>{
            await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

            const email = 'tuomis@gmail.com';
            const password = 'Tuomis123';

            await userEvent.type(screen.getByLabelText('Email:'),email);
            await userEvent.type(screen.getByLabelText('Repeat email:'),email);

            await userEvent.type(screen.getByLabelText('Password:'),password);
            await userEvent.type(screen.getByLabelText('Repeat password:'),password+'x');
            act(()=>{fireEvent.click(screen.getByRole('button', { name: /sign up/i }))});
            expect(screen.getByText(`passwords don't match`)).toBeTruthy();


        })
    })
})

describe('login functionality works properly',function(){
    beforeEach(()=>{
        render(<App />);
    })
    it('loads login tab from the starting view',async function(){
        await waitFor(()=>{
            userEvent.click(screen.getByRole('button', { name: /log in/i }));

            expect(screen.getByText(/log in with your credentials/i)).toBeTruthy();
        })
    })
    it('login flow with correct(existing) email and password',async function(){
        await waitFor(async ()=>{
            userEvent.click(screen.getByRole('button', { name: /log in/i }));

            const email = 'testing@gmail.com';
            const password = 'testing123';

            await userEvent.type(screen.getByLabelText('Email:'),email);
            await userEvent.type(screen.getByLabelText('Password:'),password);

            fireEvent.click(screen.getByRole('button', { name: /log in/i }));

            const auth = getAuth(app);
            let isErrThrown = false;

            await act(async ()=>{await signInWithEmailAndPassword(auth, email, password)
              .then((res) => {
                // should be able to 
                expect(res.user).toBeTruthy();
              })
              .catch((error) => {
                isErrThrown = true;
              });
            })
        if(isErrThrown)expect(2).toEqual(1);
    }, { timeout: '3000' })
    })
    it('login flow with incorrect(not existing) email',async function(){
        await waitFor(async ()=>{
            userEvent.click(screen.getByRole('button', { name: /log in/i }));

            const email = 'taratara@gmail.com';
            const password = 'taratara123';

            await userEvent.type(screen.getByLabelText('Email:'),email);

            await userEvent.type(screen.getByLabelText('Password:'),password);
            fireEvent.click(screen.getByRole('button', { name: /log in/i }));


            const auth = getAuth(app);
            let isErrThrown = false;

            await act(async ()=>{await signInWithEmailAndPassword(auth, email, password)
              .then((res) => {
                // as in previous tests, this .then is considered an error - incorrect login email shouldnt give a valid login
                isErrThrown = true;
              })
              .catch((err) => {
                expect(err).toBeTruthy();
              });
            })
            if(isErrThrown)expect(2).toBe(1);

        }, { timeout:'3000' })
    })
})


// IMPORTANT -------------- tests are passing, truthy values replaced with falsy make the tests fail, therefore the tests are working properly,
// even though it shows weird warning errors about act() in the console.