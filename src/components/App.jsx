import React from "react";
import MovieList from "./MovieList.jsx";
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout.js";
import MovieAPIService from "../servises/MovieApiService.js";
import noPosterImage from '../assets/no_poster.png'


const templateDescription = "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...";
const templatePhotoSrc = "../assets/templatePhoto.png"

export default class App extends React.Component{
    

    constructor(props){
        
        super(props)

        this.maxID = 0;
        this.movieApi = new MovieAPIService();

        (async ()=>{
            const movieData = await this.movieApi.searchMovie('return')
            this.setState({movies:[...this.loadMovies(movieData)]})
        })()

    }

    loadMovies = (apiJson)=>{
        return apiJson.results.map(result=>({
            id: result.id,
            name: result.title, 
            date: new Date(result.release_date),
            description: result.overview,
            tags: result.genre_ids,
            src: this.getFullImageURL(result.poster_path),
        }))
    }

    getFullImageURL = (resonseURL)=>{
        if(!resonseURL) return noPosterImage
        return `https://image.tmdb.org/t/p/original${resonseURL}`
    }

     makeMovie = (name, date, tags, description, src) =>{
        return {
            id: this.maxID++,
            name,
            date, 
            tags, 
            description, 
            src
        }
    }

    state={
        movies:[
        ]
    }

    render(){
        const contentStyles = {
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            padding: "16px"
        }


        return (
            <Layout style={{height:"100%"}}>
                    <Content style={contentStyles}>
                        <MovieList {...this.state}/>
                    </Content>
           
            </Layout>
        )
    }
}