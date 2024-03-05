import React from "react";
import Text from 'antd/es/typography/Text';
import _ from 'loadsh'

const getColor = (rating) =>{
    switch(true){
        case _.inRange(rating, 0, 3): return "#E90000";
        case _.inRange(rating, 3, 5): return "#E97E00";
        case _.inRange(rating, 5, 7): return "#E9D100";
        default: return "#66E900";
    }
}

export default function Rating({rating}){

    const color = getColor(rating)

    const containerStyle = {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: `1px solid ${color}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={containerStyle}>
            <Text>{rating}</Text>
        </div>
    )
}