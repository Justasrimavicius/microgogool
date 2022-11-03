import {cleanup, render, screen, waitFor} from '@testing-library/react';
import Content from '../../Components/MainSections/Content';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'; 
import UIDContext from '../../UIDContext'

describe('main path testing',function(){

//     // CLEAN DOM HERE
//     afterEach(() => {
//         cleanup();
//       });


    it('content screen correct',async function(){
//         await waitFor(async ()=>{
//             let centerPathContent='mainPath';
//             function loadCenterPathContent(value){
//                 centerPathContent=value;
//             }
//             let UID = 'vMKqJiwL1rdWvzFj9LLab53NzE82';
//             render(
//                 <UIDContext.Provider value={{UID,function(){return 0}}} >
//                     <Content centerPathContentProp={{centerPathContent, loadCenterPathContent}}/>
//                 </UIDContext.Provider>
//                 );
//             const sec1 = await screen.findByText(/section 1: the start \- simple words/i);
//             expect(sec1).toBeInTheDocument();
//         },{timeout: 3000})
    })
//     it.skip('able to visit one lesson page, go back and revisit it again',async function(){
//         await waitFor(async ()=>{
//             let centerPathContent='';
//             const loadCenterPathContent = jest.fn();
//             render (<Content centerPathContentProp={{centerPathContent, loadCenterPathContent}}/>);

//             await act(async()=>{
//                 const lessonStart = await screen.findByTestId('startBtn0');
//                 await userEvent.click(lessonStart);
//             })
//             const questionTitle = await screen.findByText(/question 2: which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i);
//             expect(questionTitle).toBeVisible();

//             await act(async()=>{
//                 const goBack = await screen.findByRole('button', { name: /go back/i });
//                 await userEvent.click(goBack);
//             });

//             const section = await screen.findByText(/section 1: the start \- simple words/i);
//             expect(section).toBeInTheDocument();

//             await act(async()=>{
//                 const lessonStart = await screen.findByTestId('startBtn0');
//                 await userEvent.click(lessonStart);
//             })
//             expect(questionTitle).toBeInTheDocument();
//         },{timeout: 3000})
//     })
//     it.skip('able to visit one lesson page, go back and visit a different one',async function(){
//         await waitFor(async ()=>{
//             let centerPathContent='';
//             function loadCenterPathContent(value){
//                 centerPathContent=value;
//             }
//             render (<Content centerPathContentProp={{centerPathContent, loadCenterPathContent}}/>);
//             await act(async ()=>{
//                 const lessonStart = await screen.findByTestId('startBtn0');
//                 userEvent.click(lessonStart);
//             })
//             const questionTItle = await screen.findByText(/question 2: which one of these 3 words \- "clap", "say" or "bake" \- means "kepti"\?/i);
//             expect(questionTItle).toBeTruthy();


//             await act(async()=>{
//                 const goBack = await screen.findByRole('button', { name: /go back/i });
//                 userEvent.click(goBack);
//             });
//             const sectionTitle = await screen.findByText(/section 1: the start \- simple words/i);
//             expect(sectionTitle).toBeTruthy();


//             await act(async ()=>{
//                 const lessonStart = await screen.findByTestId('startBtn2');
//                 userEvent.click(lessonStart);
//             })
//             const question = await screen.findByText(/question 2: which english sentence is the translation of this lithuanian sentence: "ėjau link katedros, kur ir sutikau pijaus mamą\."/i);
//             expect(question).toBeTruthy();
//         },{timeout: 3000})
//     })
// })
// describe.skip('whole lesson flow testing(second lesson)',function(){
//     it('skipped 1 question',async function(){
//         await waitFor(async ()=>{
//             render (<Content props={{centerPathContent, function(){return 0}}}/>);

//             await act(async()=>{
//                 const lessonStart = await screen.findByTestId('startBtn1');
//                 await userEvent.click(lessonStart);

//                 // second question
//                 const ratas = await screen.findByRole('button', { name: /ratas/i});
//                 userEvent.click(ratas);
//                 const akmuo = await screen.findByRole('button', { name: /akmuo/i});
//                 userEvent.click(akmuo);
//                 const durys = await screen.findByRole('button', { name: /durys/i});
//                 userEvent.click(durys);

//                 // third question
//                 const answer = await screen.findByRole('button', { name: /Tomas vakar padarė avariją/i});
//                 userEvent.click(answer);

//                 // fourth question
//                 const valtis = await screen.findByRole('button', { name: /valtis/i});
//                 userEvent.click(valtis);
//                 const tepalai = await screen.findByRole('button', { name: /tepalai/i});
//                 userEvent.click(tepalai);
//                 const variklis = await screen.findByRole('button', { name: /variklis/i});
//                 userEvent.click(variklis);
                
//                 // answers submit
//                 const submit = await screen.findByRole('button', { name: /submit the answers/i });
//                 userEvent.click(submit);
//             })
//             const final = await screen.findByText(/you must answer all of the questions./i);
//             expect(final).toBeTruthy();
//         },{timeout: 3000})
//     })
//     it('skipped an answer in a SelectMultiple question(selected 2 out of 3)',async function(){
//         await waitFor(async ()=>{
//             render(<Content />);
//             await act(async ()=>{
//                 const lessonStart = await screen.findByTestId('startBtn1');
//                 await userEvent.click(lessonStart);
//             // first question
//                 const q1 = await screen.findByRole('button', { name: /eisiu nakvoti kitoje vietoje/i });
//                 // expect(q1).toBeFalsy();
//                 userEvent.click(q1);

//             // second question
//                 const q2_1 = await screen.findByRole('button', { name: /ratas/i});
//                 userEvent.click(q2_1);
//                 const q2_2 = await screen.findByRole('button', { name: /akmuo/i});
//                 userEvent.click(q2_2);
//                 const q2_3 = await screen.findByRole('button', { name: /durys/i});
//                 userEvent.click(q2_3);

//             // third question
//                 const q3 = await screen.findByRole('button', { name: /Tomas vakar padarė avariją/i});
//                 userEvent.click(q3);
//             // fourth question - 2 out of 3 selected
//                 const q4_1 = await screen.findByRole('button', { name: /valtis/i});
//                 userEvent.click(q4_1);
//                 const q4_2 = await screen.findByRole('button', { name: /tepalai/i});
//                 userEvent.click(q4_2);
//             // fifth question
//                 const q5 = await screen.findByRole('button', { name: /Užvakar su kambarioku iškepėme picą, kuri nebuvo labai skani/i});
//                 userEvent.click(q5);


//                 const submitAnswers = await screen.findByRole('button', { name: /submit the answers/i });
//                 await userEvent.click(submitAnswers);
                
//             })
//             const text = await screen.findByText(/you have skipped an answer inside a question\./i)
//             // expect(text).toBeVisible();
            
            
//         },{timeout: 3000})
//     })
//     it(('whole lesson done'),async function(){
//         await waitFor(async ()=>{
//             render(<Content />);
//             await act(async ()=>{
//                 const lessonStart = await screen.findByTestId('startBtn1');
//                 await userEvent.click(lessonStart);
//             // first question
//                 const q1 = await screen.findByRole('button', { name: /Aš paėmiau krepšius iš mašinos/i });
//                 userEvent.click(q1);

//             // second question
//                 const q2_1 = await screen.findByRole('button', { name: /ratas/i});
//                 userEvent.click(q2_1);
//                 const q2_2 = await screen.findByRole('button', { name: /akmuo/i});
//                 userEvent.click(q2_2);
//                 const q2_3 = await screen.findByRole('button', { name: /durys/i});
//                 userEvent.click(q2_3);

//             // third question
//                 const q3 = await screen.findByRole('button', { name: /Tomas vakar padarė avariją/i});
//                 userEvent.click(q3);
//             // fourth question - 2 out of 3 selected
//                 const q4_1 = await screen.findByRole('button', { name: /valtis/i});
//                 userEvent.click(q4_1);
//                 const q4_2 = await screen.findByRole('button', { name: /tepalai/i});
//                 userEvent.click(q4_2);
//                 const q4_3 = await screen.findByRole('button', { name: /variklis/i});
//                 userEvent.click(q4_3);
//             // fifth question
//                 const q5 = await screen.findByRole('button', { name: /Užvakar su kambarioku iškepėme picą, kuri nebuvo labai skani/i});
//                 userEvent.click(q5);


//                 const submitAnswers = await screen.findByRole('button', { name: /submit the answers/i });
//                 await userEvent.click(submitAnswers);
                
//             })
//             const text = await screen.findByText(/percentage of answers gotten right: 20%/i);
//             expect(text).toBeVisible();
            


            
//         },{timeout: 3000})
//     })
})

// THIS WILL BECOME AN E2E TEST