import App from 'src/app';

import {render, screen, waitFor} from '@testing-library/react';
import MainPath from '../../Components/ContentSecComponents/MainPath'

describe('main path testing',function(){
    it('overall test',async function(){
        await waitFor(async ()=>{
            render(<MainPath />);
            const sec1 = screen.getByText(/section 1: the start \- simple words/i);
            expect(sec1).toBeTruthy();
        })

    })
})