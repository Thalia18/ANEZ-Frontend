import React from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Image } from 'semantic-ui-react';

import { eliminarTildes, mapStateToProps } from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Footer = ({ user, telefono, direccion }) => {
  return (
    <React.Fragment>
      <Container
        style={{
          fontSize: '0.9em',
          borderTop: 'solid black',
          width: '50%',
          textAlign: 'center',
        }}
      >
        DR(A). {''}
        {eliminarTildes(user.nombre)}
        {''}
        {eliminarTildes(user.apellido)}
      </Container>
      <br />
      <br />

      <Container
        style={{
          position: 'relative',
          display: 'inline-block',
          textAlign: 'center',
          fontSize: '0.9em',
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
          {eliminarTildes(telefono)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Icon name='map marker alternate' />
          {eliminarTildes(direccion)}
          {/* ORELLANA Y AV. 6 DE DICIEMBRE */}
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, null)(Footer);
