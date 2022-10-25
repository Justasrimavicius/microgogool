import React from 'react';

function ErrorComponent(props: {message: string}) {
    return (
        <div className='error-window'>
            <div className='error-div'>
                <p>{props.message}</p>
            </div>
        </div>
    );
}

export default ErrorComponent;