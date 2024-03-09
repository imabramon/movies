import { Alert } from 'antd';
import React from 'react';

export default function NetworkErrorStub() {
  return <Alert message="Ошибка" description="Пользователь, я не чувствую интернета" type="error" showIcon />;
}
