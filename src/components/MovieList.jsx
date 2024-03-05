import React from 'react';
import { Flex, Pagination } from 'antd';
import MovieItem from './MovieItem';

export default function MovieList(props) {
  const { movies, totalPages, currentPage, changePageHandler, rateHandler} = props;
  const movieElements = movies.map((movieData) => <MovieItem key={movieData.id} {...movieData} rateHandler={rateHandler}/>);

  const flexStyle = {
    width: 1036,
  };

  const onChange = (current)=>{
    changePageHandler(current)
  }
  return (
    <Flex vertical 
      style={{
        alignItems: "center"
      }}
      gap={36}
    >
      <Flex style={flexStyle} gap={36} wrap="wrap">
        {...movieElements}
      </Flex>
      <Pagination 
        defaultCurrent={1} 
        total={totalPages} 
        current={currentPage} 
        onChange={onChange}
      />
    </Flex>
  );
}
