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

  async checkSession() {
    if (this.guestSessionId) {
      return;
    }

    const { guest_session_id: guestSessionId } = await this.getResponse('authentication/guest_session/new');
    this.guestSessionId = guestSessionId;
  }

  async getResponse(url, options = {}) {
    const res = await fetch(this.server + url, { ...this.defualtOptions, ...options });
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

  async getGenres() {
    const genresData = await this.getResponse('genre/movie/list');
    return genresData;
  }

  async rateMovie(id, rating) {
    await this.checkSession();
    const result = await this.getResponse(`movie/${id}/rating?guest_session_id=${this.guestSessionId}`, {
      method: 'POST',
      body: JSON.stringify({
        value: rating,
      }),
    });
    return result;
  }
}
