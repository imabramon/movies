import React from "react";
import Title from 'antd/es/typography/Title';
import ContentMayOverflow from "./ContentMayOverflow/ContentMayOverflow";

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

    return (
        <Title 
          className = {`movie-item__title ${overflowClassName}`}
          level="2" 
          style={titleStyles}
        >
          <ContentMayOverflow isOverflow={isOverwlow}>{title}</ContentMayOverflow>
        </Title>
    )
}