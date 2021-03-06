import React from 'react';
import { Container, Icon, Image } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const Footer = ({ telefono, direccion }) => {
  return (
    <Container
      style={{
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '0.6em',
      }}
    >
      <Image src='https://i.ibb.co/WGv0hvL/Screen-Shot-2021-02-27-at-20-39-15.png' />
      <Container
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFF',
        }}
      >
        <Icon name='phone' />
        &nbsp;&nbsp;
        {telefono}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Icon name='map marker alternate' />
        {direccion}
      </Container>
    </Container>
  );
};

export default Footer;
