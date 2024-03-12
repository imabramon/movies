import React from 'react';
import { Alert } from 'antd';

export default function EmptyStub({ message }) {
  return (
    <Alert
      style={{
        width: '300px',
        margin: 'auto',
      }}
      message="Введите запрос"
      description={message}
      type="info"
      showIcon
    />
  );
}
