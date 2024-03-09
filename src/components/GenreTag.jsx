import React from 'react';
import { GenresContext } from '../contexts/GenresContext';
import { Spin, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function GenreTag({ id }) {
  return (
    <GenresContext.Consumer>
      {(genres) => {
        const tagLoader = <Spin indicator={<LoadingOutlined style={{ fontSize: 10 }} spin />} />;
        let content;
        if (!genres) {
          content = tagLoader;
        } else {
          content = genres[id];
        }
        return <Tag>{content}</Tag>;
      }}
    </GenresContext.Consumer>
  );
}
