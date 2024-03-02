import React from 'react';
import MovieList from './MovieList.jsx';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout.js';
import MovieAPIService from '../servises/MovieApiService.js';
import noPosterImage from '../assets/no_poster.png';
import LoadingStab from './LoadingStab.jsx';
import NetworkError from '../errors/NetworkError.js';
import ErrorStub from './ErrorStub.jsx';
import EmptySearchStub from './EmptySearchStub.jsx';
import SearchInput from './SearchInput.jsx';
import _ from 'loadsh'

var sleepSetTimeout_ctrl;

function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

export default class App extends React.Component {

  static ContentState = {
    isLoading: 'isLoading',
    isError: 'isError',
    isContenLoaded: 'isContenLoaded',
    isEmptySearch: 'isEmptySearch',
  };

  state = {
    movies: [],
    contentState: App.ContentState.isEmptySearch,
    loadError: null,
    inputValue: "Return",
  };

  maxID = 0;
  movieApi = new MovieAPIService();

  handleOnline = ()=>{
    this.setState({
      contentState: this.inputValue ? App.ContentState.isLoading : App.ContentState.isEmptySearch
    })

    // this.loadData()
  }

  handleOfline = (evt)=>{
    this.setState({
      loadError: new NetworkError(),
      contentState: App.ContentState.isError
    })
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

  renderContent = (contentState)=>{
    switch(contentState){
      case App.ContentState.isContenLoaded: return <MovieList {...this.state} />
      case App.ContentState.isLoading: return <LoadingStab/>
      case App.ContentState.isEmptySearch: return <EmptySearchStub/>
      case App.ContentState.isError: 
      default: 
        return <ErrorStub error={this.state.loadError} />
    }
  }

  loadData = _.throttle((query) =>{
    (async () => {
      try {
        console.log(query)
        // await sleep(10000)
        const movieData = await this.movieApi.searchMovie(query);
        this.setState({ 
          movies: [...this.loadMovies(movieData)],
          contentState: App.ContentState.isContenLoaded
        });
      }catch(e){
        this.setState({
          contentState: App.ContentState.isError,
          loadError: e,
        })
      }
    })();
  }, 2000)

  inputChange = (evt) =>{
    this.setState({
      inputValue: evt.target.value
    })
  }

  componentDidMount(){
    if(window) {
      window.addEventListener('online',  this.handleOnline)
      window.addEventListener('offline', this.handleOfline)
    }
    this.loadData()
  }

  componentWillUnmount(){
    if(window) {
      window.removeEventListener('online',  this.handleOnline)
      window.removeEventListener('offline', this.handleOfline)
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {inputValue} = this.state;

    if(inputValue !== prevState.inputValue){
      if(inputValue){
        this.setState({contentState: App.ContentState.isLoading})
        this.loadData(inputValue)
      }
    }
  }

  render() {
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
        <Header>
          <SearchInput changeHandler={this.inputChange}/>
        </Header>
        <Content style={contentStyles}>
         {this.renderContent(this.state.contentState)}
        </Content>
      </Layout>
    );
  }
}
