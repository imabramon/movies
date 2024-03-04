import React from "react";
import SearchMoviePage from "./SearchMoviePage";
import { Tabs } from "antd";
import MovieAPIService from '../servises/MovieApiService.js';
import { GenresContext } from "../contexts/GenresContext.jsx";
import { APIContext } from "../contexts/APIContext.jsx";

export default class App extends React.Component{
    movieApi = new MovieAPIService();

    state ={
        genres: undefined
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

    render(){
        const searchTab = {
            label: "Search",
            key: 1,
            children: <SearchMoviePage/>
        }

        const ratedTab = {
            label: "Rated",
            key: 2,
            children: "This is your rated films"
        }

        return (
            <APIContext.Provider value={this.movieApi}>
                <GenresContext.Provider value={this.state.genres}>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={[
                            searchTab, 
                            ratedTab
                        ]}
                    />
                </GenresContext.Provider>
            </APIContext.Provider>
        )
    }
}