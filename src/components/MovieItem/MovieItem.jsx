import React from 'react';
import { Card, Image, Row, Col, Flex, Space, ConfigProvider , Rate} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import defaultPicture from '../../assets/templatePhoto.png';
import { format, formatDistanceToNow } from 'date-fns';
import GenreTag from '../GenreTag';
import Rating from '../Rating';
import { RatingContext } from '../../contexts/RatingContext';
import './MovieItem.scss'
import MovieTitle from '../MovieTitle';

export default function MovieItem(props) {
  const { id, name, date, tags, description, src, rating, rateHandler} = props;
  // console.log(src);

  const rateMovie = (rating)=>{
    rateHandler(props, rating)
  }

  const formatDate = (date) => {
    try {
      return format(date, 'do MMMM, y');
    } catch {
      return 'release date not specified';
    }
  };

  const tagsElements = tags.map((tag) => <GenreTag id={tag}/>)

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

  const isMobile = window.matchMedia("(max-width: 1035px)").matches
  // console.log(isMobile)

  const imageSize = {
    width: isMobile ? "calc(60 / 420 * 100vw)" : 180,
    height: isMobile ? "calc(90 / 420 * 100vw)" : 280,
  }

  const trimText = (text)=>{
      const maxSize = 198;

      if(maxSize - text.length >= 0) return text
      let textEnd = maxSize - 3;
      
      while(text.charAt(textEnd) !== ' '){
        textEnd--;
      }

      return text.substring(0, textEnd) + "..."
      
  };

  const paragraph = 
    description !== "" 
    ?
    <Paragraph 
      className='movie-item__description'
      style={{width: 228}}
      // ellipsis={{ rows: 6 }}
    >
      {trimText(description)}
    </Paragraph>
    :
    null;

    

    return (
      <Card style={cardStyle} classNames={{body:'movie-item'}}>
        <Image 
          rootClassName='movie-item__poster'
          src={src} 
          style={imageStyle} 
          {...imageSize}
          // {width={180}
          // height={280}}
        />
        <MovieTitle title={name}/>
        <Rating 
          className='movie-item__rating'
          rating={rating.toFixed(1)}
        />
        <Text
          className='movie-item__release-date' 
          type="secondary"
        >
          {formatDate(date)}
        </Text>
        <Space
          className='movie-item__tags' 
          wrap
        >
          {tagsElements}
        </Space>
        {paragraph}
        <RatingContext.Consumer>
          {ratingMap=>
            <Rate className="movie-item__rate-input" count={10} allowHalf style={{fontSize: 18}} onChange={rateMovie} value={id in ratingMap ? ratingMap[id] : 0}/>
          }
        </RatingContext.Consumer>
      </Card>
    )

  // return (
  //   <Card 
  //     style={cardStyle} 
  //     styles={cardStyles}
  //   >
  //     <Row wrap={false}>
  //       <Col flex={6}>
  //         <Image 
  //           src={src} 
  //           style={imageStyle} 
  //         />
  //       </Col>
  //       <Col flex={9}>
  //         <Flex vertical style={{ 
  //               width: '270px',
  //               height: "100%",
  //               paddingBottom: '20px' 
  //             }} justify='space-between'>
  //           <Flex 
  //             vertical 
  //             style={{ 
  //               width: '270px' 
  //             }} 
  //             gap="small"
  //           >
  //             <Flex justify='space-between' align='center'>
  //               <Title level="2" style={titleStyles}>
  //                 {name}
  //               </Title>
  //               <Rating rating={rating}/>
  //             </Flex>
              // <Text type="secondary">{formatDate(date)}</Text>
              // <Space wrap>{tagsElements}</Space>
              // <Paragraph ellipsis={{ rows: 6 }}>{description}</Paragraph>
  //           </Flex>
            // <RatingContext.Consumer>
            //   {ratingMap=>
            //     <Rate count={10} allowHalf style={{fontSize: 18}} onChange={rateMovie} value={id in ratingMap ? ratingMap[id] : 0}/>
            //   }
            //   </RatingContext.Consumer>
  //         </Flex>
  //       </Col>
  //     </Row>
  //   </Card>
  // );
}
