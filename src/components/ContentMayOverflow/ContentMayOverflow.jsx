import React from "react";
import './ContentMayOverflow.scss';

export default function ContentMayOverflow({isOverflow, children}){
    if(!isOverflow) return (<>{children}</>)

    return (
        <div className="content-may-overflow">
           <div className="content-may-overflow__container">
                <div className="content-may-overflow__child">
                    {children}
                </div>
                <div className="content-may-overflow__child">
                    {children}
                </div>
           </div>
        </div>
    )
}