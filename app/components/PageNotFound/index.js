import React from 'react';
import { Card } from 'react-bootstrap';

export default function PageNotFound({ title, message, icon }) {
  return (
    <Card
      headStyle={{ textAlign: 'center' }}
      bodyStyle={{ textAlign: 'center' }}
    >
      <div>
        {icon}
        <h1>{title}</h1>
        <h4>{message}</h4>
      </div>
    </Card>
  );
}
