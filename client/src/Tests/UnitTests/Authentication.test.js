import App from 'src/app';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('signup functionality works properly',function(){

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

          const email = 'tuomis@gmail.com';
          const emailR = 'tuomis@gmail.com';
          const password = 'Tuomis123';
          const passwordR = 'Tuomis123';

            await new Promise((resolve,reject)=>{
              let xhr = new XMLHttpRequest();
              xhr.open("POST", 'http://localhost:8080/signup', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({
                  email,
                  emailR,
                  password,
                  passwordR
              }));
              xhr.onload = ()=>{
                  const parsedResponse = JSON.parse(xhr.responseText);
                    expect(parsedResponse).toEqual('Email is already in use');
                    resolve(parsedResponse)
              }
            })
      },{timeout: 3000})
    })
    it('signup with different email/repeat email', async function(){
        await waitFor(async ()=>{
            const email = 'tuomisis@gmail.com';
            const emailR = 'tuomisisx@gmail.com'
            const password = 'Tuomis123';
            const passwordR = 'Tuomis123';

            await new Promise((resolve,reject)=>{
              let xhr = new XMLHttpRequest();
              xhr.open("POST", 'http://localhost:8080/signup', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({
                  email,
                  emailR,
                  password,
                  passwordR
              }));
              xhr.onload = ()=>{
                  const parsedResponse = JSON.parse(xhr.responseText);
                    expect(parsedResponse).toEqual(`Emails don't match`);
                    resolve(parsedResponse)
              }
            })
        })
    })
    it('signup with different password/repeat password', async function(){
        await waitFor(async ()=>{

            const email = 'tuomis@gmail.com';
            const emailR = 'tuomis@gmail.com';
            const password = 'Tuomis123';
            const passwordR = 'Tuomis123x';

            await new Promise((resolve,reject)=>{
              let xhr = new XMLHttpRequest();
              xhr.open("POST", 'http://localhost:8080/signup', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({
                  email,
                  emailR,
                  password,
                  passwordR
              }));
              xhr.onload = ()=>{
                  const parsedResponse = JSON.parse(xhr.responseText);
                    expect(parsedResponse).toEqual(`Passwords don't match`);
                    resolve(parsedResponse)
              }
            })
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

            await new Promise((resolve,reject)=>{
              let xhr = new XMLHttpRequest();
              xhr.open("POST", 'http://localhost:8080/login', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({
                  email,
                  password
              }));
              xhr.onload = ()=>{
                  const parsedResponse = JSON.parse(xhr.responseText);
                  expect(parsedResponse.UID).toBeTruthy();
                  resolve(parsedResponse.UID);
              }
            })

    }, { timeout: '3000' })
    })
    it('login flow with incorrect(not existing) email',async function(){
        await waitFor(async ()=>{
            userEvent.click(screen.getByRole('button', { name: /log in/i }));

            const email = 'taratara@gmail.com';
            const password = 'taratara123';

            await new Promise((resolve,reject)=>{
              let xhr = new XMLHttpRequest();
              xhr.open("POST", 'http://localhost:8080/login', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.send(JSON.stringify({
                  email,
                  password
              }));
              xhr.onload = ()=>{
                  const parsedResponse = JSON.parse(xhr.responseText);
                  console.log(parsedResponse)
                  expect(parsedResponse).toEqual('User not found');
                  resolve(parsedResponse);
              }
            })

        }, { timeout:'3000' })
    })
})


// most authentication cases are tested, but cant seem to think of a way to test an actual signup(when the email is not in use).

// also, skip this test when it is not needed - firebase will throw "network request failed" after a lot of authentication requests.
// if it happens, just wait it out for 5-10 minutes