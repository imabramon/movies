export default class MovieAPIService{
    server = 'https://api.themoviedb.org/3/'
    authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTUzMWExMmY0ZWZiZDMyNTZlZDRjOTkxMTdkNmQ4ZCIsInN1YiI6IjY1ZDliOTlmOTNiZDY5MDE2MjhiODIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tW7Tgl7fSS4tqxpRXt-mQoaYanTrgHHvz9xwFLqXmWc'
    defualtOptions = {
        headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.authToken}`
        }
    }

    async getResponse (url){
        const res = await fetch(this.server + url, this.defualtOptions)
        const data = await res.json()
        return data
    }

    async search(query){
        return await this.getResponse(`search/${encodeURI(query)}`)
    }

    async searchMovie(query){
        return await this.search(`movie?include_adult=false&language=en-US&page=1&query=${query}`)
    }

    

     
}