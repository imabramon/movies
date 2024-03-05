import React from "react";
import { render } from "react-dom";
import MovieList from "./MovieList";
import EmptySearchStub from "./EmptySearchStub";
import { Layout } from "antd";
import { Content} from 'antd/es/layout/layout.js';

export default function RatedMoviePage({movies}){
    console.log(movies)

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
                {movies.length !== 0 ? <MovieList movies={movies}/> : <EmptySearchStub />} 
            </Content>
        </Layout>
    );
    
}