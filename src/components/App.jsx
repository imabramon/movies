import React from 'react';
import MovieList from './MovieList.jsx';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout.js';
import MovieAPIService from '../servises/MovieApiService.js';
import noPosterImage from '../assets/no_poster.png';

export default class App extends React.Component {

  static ContentState = {
    isLoading: 'isLoading',
    isError: 'isError',
    isNoInternetConnection: 'isNoInternetConnection',
    isContenLoaded: 'isContenLoaded'
  };

  constructor(props) {
    super(props);

    this.maxID = 0;
    this.movieApi = new MovieAPIService();

    (async () => {
      const movieData = await this.movieApi.searchMovie('return');
      this.setState({ 
        movies: [...this.loadMovies(movieData)],
        contentState: App.ContentState.isContenLoaded
      });
    })();
  }

  loadMovies = (apiJson) => {
    return apiJson.results.map((result) => ({
      id: result.id,
      name: result.title,
      date: new Date(result.release_date),
      description: result.overview,
      tags: result.genre_ids,
      src: this.getFullImageURL(result.poster_path),
    }));
  };

  getFullImageURL = (resonseURL) => {
    if (!resonseURL) return noPosterImage;
    return `https://image.tmdb.org/t/p/original${resonseURL}`;
  };

  state = {
    movies: [],
    contentState: App.ContentState.isLoading
  };

  renderContent = (contentState)=>{
    switch(contentState){
      case App.ContentState.isContenLoaded: return <MovieList {...this.state} />
      case App.ContentState.isLoading: return <div>Is Loading</div>
      case App.ContentState.isNoInternetConnection: return <div>Is No Internet Connection</div>
      case App.ContentState.isError: 
      default:
        return <div>Is Error</div>
    }
  }

  render() {
    const contentStyles = {
      width: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'white',
      padding: '16px',
    };

    return (
      <Layout style={{ height: '100%' }}>
        <Content style={contentStyles}>
         {this.renderContent(this.state.contentState)}
        </Content>
      </Layout>
    );
  }
}
