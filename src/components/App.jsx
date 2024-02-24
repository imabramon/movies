import React from "react";
import MovieList from "./MovieList.jsx";
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout.js";


const templateDescription = "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...";
const templatePhotoSrc = "../assets/templatePhoto.png"

export default class App extends React.Component{
    maxID = 0;

    constructor(props){
        super(props)

        const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=return';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTUzMWExMmY0ZWZiZDMyNTZlZDRjOTkxMTdkNmQ4ZCIsInN1YiI6IjY1ZDliOTlmOTNiZDY5MDE2MjhiODIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tW7Tgl7fSS4tqxpRXt-mQoaYanTrgHHvz9xwFLqXmWc'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                this.setState({movies:[...this.loadMovies(json)]})
            })
            .catch(err => console.error('error:' + err));
    }

    loadMovies = (apiJson)=>{
        return apiJson.results.map(result=>({
            id: result.id,
            name: result.title, 
            date: new Date(result.release_date),
            description: result.overview,
            tags: result.genre_ids
        }))
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