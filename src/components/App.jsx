import React from "react";
import SearchMoviePage from "./SearchMoviePage";
import { Tabs } from "antd";
import MovieAPIService from '../servises/MovieApiService.js';
import { GenresContext } from "../contexts/GenresContext.jsx";
import { APIContext } from "../contexts/APIContext.jsx";
import {RatingContext} from "../contexts/RatingContext.jsx";
import RatedMoviePage from "./RatedMoviePage.jsx";

export default class App extends React.Component{
    movieApi = new MovieAPIService();

    state ={
        genres: undefined,
        ratedMovies: [],
        ratingMap: {}
    }

    constructor(props){
        super(props)

        ;(async()=>{
            const {genres: genresArr} = await this.movieApi.getGenres()
            const genres={}

            genresArr.map(({id, name})=>{
                genres[id] = name
            })

            this.setState({
                genres 
            })
        })()
    }

    rateMovie = (movieData, rating)=>{
        // this.movieApi.rateMovie(movieData.id, rating).then(res => console.log(res))

        if(movieData.id in this.state.ratingMap){
            this.setState(({ratingMap})=>({
                ratingMap:{
                    ...ratingMap,
                    [movieData.id]: rating
                }
            }))
            return
        }

        this.setState(({ratedMovies, ratingMap})=>({
            ratedMovies: [...ratedMovies, {...movieData, userRating: rating}],
            ratingMap:{
                    ...ratingMap,
                    [movieData.id]: rating
                }
        }))
    }

    render(){
        console.log("App render")
        const searchTab = {
            label: "Search",
            key: 1,
            children: <SearchMoviePage rateHandler={this.rateMovie}/>
        }

        const ratedTab = {
            label: "Rated",
            key: 2,
            children: <RatedMoviePage  movies={this.state.ratedMovies} rateHandler={this.rateMovie}/>
        }

        return (
            <APIContext.Provider value={this.movieApi}>
                <GenresContext.Provider value={this.state.genres}>
                    <RatingContext.Provider value={this.state.ratingMap}>
                        <Tabs
                            defaultActiveKey="1"
                            centered
                            items={[
                                searchTab, 
                                ratedTab
                            ]}
                        />
                    </RatingContext.Provider>
                </GenresContext.Provider>
            </APIContext.Provider>
        )
    }
}