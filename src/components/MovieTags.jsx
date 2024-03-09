import React from "react";
import { Space } from "antd";
import { GenresContext } from "../contexts/GenresContext";
import ContentMayOverflow from "./ContentMayOverflow/ContentMayOverflow";
import GenreTag from './GenreTag';

export default class MovieTags extends React.Component{
    static contextType = GenresContext
    ids = this.context

    render(){
        const {className, tags} = this.props

        const tagsElements = tags.map((tag) => <GenreTag id={tag}/>)

        const isOverlow = ((tagIds)=>{
            if(!this.ids) return false

            const tagsLength = tagIds.map(id=>this.ids[id].length)
            const symbolWidth = 7
            const tagsPadding = 14
            const tagsGap = 8
            const length = 
                tagsLength.reduce((acc, curr)=> acc + curr, 0)*symbolWidth + 
                tagsLength.length * tagsPadding +
                (tagsLength.length ? tagsLength.length - 1 : 0) * tagsGap;
            
            const maxLength = 200

            return length > maxLength
        })(tags)

        return (
            <Space
                className={className} 
                wrap
                style={{maxWidth:200}}
            >
                <ContentMayOverflow isOverflow={isOverlow}>
                    {tagsElements}
                </ContentMayOverflow>
            </Space>
        )
    }
}