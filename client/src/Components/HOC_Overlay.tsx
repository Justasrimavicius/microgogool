import React from 'react';

function HOC_Overlay<P>(Component: React.ElementType<any | P>): JSX.Element {
    return (
        <div className='HOC_overlay'>
            <Component />
        </div>
    );
}

export default HOC_Overlay;