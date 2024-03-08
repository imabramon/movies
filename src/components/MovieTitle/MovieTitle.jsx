import React from "react";
import Title from 'antd/es/typography/Title';

import './MovieTitle.scss'

export default function MovieTitle(props){
    const {title} = props

    const titleStyles = {
        fontSize: '20px',
        maxWidth: '200px'
    };

    const isOverwlow = ((text)=>{
        const maxSize = 15;
        return text.length > maxSize
    })(title)

    const overflowClassName = isOverwlow ? "overflow-title" : ""

    return (
        <Title 
          className = {`movie-item__title ${overflowClassName}`}
          level="2" 
          style={titleStyles}
        >
          { isOverwlow
            ? <div className="overflow-title__container">
                <span className="overflow-title__title">{title}</span>
                <span className="overflow-title__title">{title}</span>
              </div>
            : title
          }
        </Title>
    )
}