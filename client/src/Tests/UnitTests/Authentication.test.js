import App from '../../App';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import app from '../../firebase';


describe('signup functionality works properly',function(){

    beforeEach(()=>{
        render(<App />);
        userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    })

    it('loads signup tab from the starting view',async function(){
        await waitFor(()=>{
            expect(screen.getByText(/repeat email:/i)).toBeTruthy();
        })
    })
    it('signup flow with matching email/repeat email and password/repeat password values',async function(){
        await waitFor(async ()=>{
            await userEvent.type(screen.getByLabelText('Email:'),'tuomis@gmail.com');
            await userEvent.type(screen.getByLabelText('Repeat email:'),'tuomis@gmail.com');

            await userEvent.type(screen.getByLabelText('Password:'),'Tuomis123');
            await userEvent.type(screen.getByLabelText('Repeat password:'),'Tuomis123');
            await fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

            const auth = getAuth(app);

            await createUserWithEmailAndPassword(auth,'tuomis@gmail.com','whatever')
              .then(res=>{
                console.log(res);
                // good case - that means the email was changed in the test and it reated a new user in database.
              })
              .catch(err=>{
                console.log(err)
                if(err.code=="auth/email-already-in-use")
                {
                    // good case - that means that input was valid, just that it already exists.
                }
              })
        })
    })
    it('signup with different email/repeat email', async function(){
        await waitFor(async ()=>{
            await userEvent.type(screen.getByLabelText('Email:'),'tuomisis@gmail.com');
            await userEvent.type(screen.getByLabelText('Repeat email:'),'tuomis@gmail.com');

            await userEvent.type(screen.getByLabelText('Password:'),'Tuomis123');
            await userEvent.type(screen.getByLabelText('Repeat password:'),'Tuomis123');
            await fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

            const auth = getAuth(app);

            await createUserWithEmailAndPassword(auth,'tuomis@gmail.com','whatever')
                .then(res=>{
                console.log(res);
                // good case - that means the email was changed in the test and it reated a new user in database.
                })
                .catch(err=>{
                expect(screen.getByText(`emails don't match`)).toBeTruthy();
                console.log(err)
                if(err.code=="auth/email-already-in-use")
                    {
                        // good case - that means that input was valid, just that it already exists.
                    }
                })
        })
    })
    it('signup with different password/repeat password', async function(){
        await waitFor(async ()=>{
            await userEvent.type(screen.getByLabelText('Email:'),'tuomis@gmail.com');
            await userEvent.type(screen.getByLabelText('Repeat email:'),'tuomis@gmail.com');

            await userEvent.type(screen.getByLabelText('Password:'),'Tuomisis123');
            await userEvent.type(screen.getByLabelText('Repeat password:'),'Tuomis123');
            await fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

            const auth = getAuth(app);

            await createUserWithEmailAndPassword(auth,'tuomis@gmail.com','whatever')
                .then(res=>{
                console.log(res);
                // good case - that means the email was changed in the test and it reated a new user in database.
                })
                .catch(err=>{
                expect(screen.getByText(`passwords don't match`)).toBeTruthy();
                console.log(err)
                if(err.code=="auth/email-already-in-use")
                    {
                        // good case - that means that input was valid, just that it already exists.
                    }
                })
        })
    })
})