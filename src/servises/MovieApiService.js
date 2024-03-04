export default class MovieAPIService {

  server = 'https://api.themoviedb.org/3/';

  authToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTUzMWExMmY0ZWZiZDMyNTZlZDRjOTkxMTdkNmQ4ZCIsInN1YiI6IjY1ZDliOTlmOTNiZDY5MDE2MjhiODIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tW7Tgl7fSS4tqxpRXt-mQoaYanTrgHHvz9xwFLqXmWc';

  defualtOptions = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    },
  };

  constructor(){
    this.checkSession()
  }

  async checkSession(){
    if(this.guestSessionId){
      return
    }

    const {guest_session_id} = await this.getResponse('authentication/guest_session/new')
    this.guestSessionId = guest_session_id
  }

  async getResponse(url) {
    const res = await fetch(this.server + url, {...this.defualtOptions});
    const data = await res.json();
    return data;
  }

  async search(query) {
    const searchResult = await this.getResponse(`search/${encodeURI(query)}`);
    return searchResult;
  }

  async searchMovie(query) {
    const moviesData = await this.search(`movie?include_adult=false&language=en-US&page=1&query=${query}`);
    return moviesData;
  }

  async searchMovieByPage(query, page) {
    const moviesData = await this.search(`movie?include_adult=false&language=en-US&query=${query}&page=${page}`);
    return moviesData;
  }
}
