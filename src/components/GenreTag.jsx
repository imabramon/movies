import React from "react";
import { GenresContext } from "../contexts/GenresContext";
import { Tag } from "antd";

export default function GenreTag({id}){
    return (
        <GenresContext.Consumer>
            {
                genres=><Tag>{genres[id]}</Tag>
            }
        </GenresContext.Consumer>
    )
}