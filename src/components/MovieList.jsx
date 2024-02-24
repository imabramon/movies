import React from "react";
import { Flex } from "antd";
import MovieItem from "./MovieItem";

export default function MovieList(props){
    const {movies} = props;
    const movieElements  = movies.map((movieData)=>(<MovieItem key={movieData} {...movieData}/>))

    const flexStyle = {
        width: 1036
    }
    return (
        <Flex style={flexStyle} gap={36} wrap="wrap">
            {...movieElements}
        </Flex>
    )
}