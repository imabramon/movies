import React from "react";
import MovieItem from "./MovieItem.jsx";


const templateDescription = "A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...";
const templatePhotoSrc = "../assets/templatePhoto.png"

export default class App extends React.Component{
    maxID = 0;

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
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
            this.makeMovie("The way back", new Date("03-05-2020"), ["Action", "Drama"], templateDescription, templatePhotoSrc),
        ]
    }

   

    render(){
        return (
            <MovieItem {...this.state.movies[0]}/>
            // <Layout>
            //     <Content>
                    
            //     </Content>
            // </Layout>
        )
    }
}