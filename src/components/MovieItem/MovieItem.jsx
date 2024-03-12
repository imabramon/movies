import React from 'react';
import { Card, Image, Rate } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import Rating from '../Rating';
import { RatingContext } from '../../contexts/RatingContext';
import './MovieItem.scss';
import MovieTitle from '../MovieTitle';
import MovieTags from '../MovieTags';

export default function MovieItem(props) {
  const { id, name, date, tags, description, src, rating, rateHandler } = props;

  const rateMovie = (rating) => {
    rateHandler(props, rating);
  };

  const formatDate = (date) => {
    try {
      return format(date, 'do MMMM, y');
    } catch {
      return 'release date not specified';
    }
  };

  const cardStyle = {
    width: 500,
    overflow: 'hidden',
  };

  const cardStyles = {
    body: {
      padding: 0,
    },
  };

  const imageStyle = {
    width: '183px',
    heigh: '100%',
  };

  const isMobile = window.matchMedia('(max-width: 1035px)').matches;

  const imageSize = {
    width: isMobile ? 'calc(60 / 420 * 100vw)' : 180,
    height: isMobile ? 'calc(90 / 420 * 100vw)' : 280,
  };

  const trimText = (text) => {
    const maxSize = 180;

    if (maxSize - text.length >= 0) return text;
    let textEnd = maxSize - 3;

    while (text.charAt(textEnd) !== ' ') {
      textEnd--;
    }

    return text.substring(0, textEnd) + '...';
  };

  const paragraph =
    description !== '' ? (
      <Paragraph className="movie-item__description" style={{ width: 228 }}>
        {trimText(description)}
      </Paragraph>
    ) : null;

  return (
    <Card style={cardStyle} classNames={{ body: 'movie-item' }}>
      <Image rootClassName="movie-item__poster" src={src} style={imageStyle} {...imageSize} />
      <MovieTitle title={name} />
      <Rating className="movie-item__rating" rating={rating.toFixed(1)} />
      <Text className="movie-item__release-date" type="secondary">
        {formatDate(date)}
      </Text>
      <MovieTags className="movie-item__tags" tags={tags} />
      {paragraph}
      <RatingContext.Consumer>
        {(ratingMap) => (
          <Rate
            className="movie-item__rate-input"
            count={10}
            allowHalf
            style={{ fontSize: 18 }}
            onChange={rateMovie}
            value={id in ratingMap ? ratingMap[id] : 0}
          />
        )}
      </RatingContext.Consumer>
    </Card>
  );
}
