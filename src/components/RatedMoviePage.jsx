import React from "react";
import { render } from "react-dom";
import MovieList from "./MovieList";
import EmptyStub from "./EmptyStub";
import { Layout } from "antd";
import { Content} from 'antd/es/layout/layout.js';

export default function RatedMoviePage({movies, rateHandler}){

    const contentStyles = {
      width: '100%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'white',
      padding: '16px',
    };

   
    return (
        <Layout style={{ height: '100%' }}>
            <Content style={contentStyles}>
                {movies.length !== 0 ? <MovieList movies={movies} rateHandler={rateHandler}/> : <EmptyStub message="Вы пока не оценили ни одного фильма, сходите в кино составьте свое"/>} 
            </Content>
        </Layout>
    );
    
}