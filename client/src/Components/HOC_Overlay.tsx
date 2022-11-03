import React, { useRef } from 'react';


// if using this HOC, component should have a setState prop named isVisible for removing the prop(setting the state) from DOM
function HOC_Overlay(Component: React.ElementType<any>){

    const overlayRef = useRef<any>();

    return (props: any)=>{

        return(
        <div className='HOC_overlay' onClick={(e)=>{
            if(overlayRef.current==e.target){
                if(props.isVisible){
                    props.isVisible(false);
                }
            }
            }} 
            ref={overlayRef}>
            <Component {...props}/>
        </div>
        )
    }

}

export default HOC_Overlay;