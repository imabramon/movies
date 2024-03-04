import React from 'react';
import { Card, Image, Row, Col, Flex, Tag, Space, ConfigProvider } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import defaultPicture from '../assets/templatePhoto.png';
import { format, formatDistanceToNow } from 'date-fns';
import GenreTag from './GenreTag';

export default function MovieItem(props) {
  const { name, date, tags, description, src } = props;
  // console.log(src);

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

  const titleStyles = {
    fontSize: '20px',
  };

  return (
    <Card style={cardStyle} styles={cardStyles}>
      <Row wrap={false}>
        <Col flex={6}>
          <Image src={src} style={imageStyle} />
        </Col>
        <Col flex={9}>
          <Flex vertical style={{ width: '270px' }} gap="small">
            <Title level="2" style={titleStyles}>
              {name}
            </Title>
            <Text type="secondary">{formatDate(date)}</Text>
            <Space wrap>{tagsElements}</Space>
            <Paragraph ellipsis={{ rows: 6 }}>{description}</Paragraph>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
