import React from 'react';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Icon, Image, Segment } from 'semantic-ui-react';
import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils';

const Error = () => {
  let history = useHistory();
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment basic>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Container
              style={{
                display: 'flex',
                textAlign: 'center',
                marginTop: '15%',
              }}
            >
              <Image
                src="https://i.ibb.co/YPk7KS8/undraw-online-test-gba7.png"
                size={matches.medium ? 'medium' : 'big'}
                style={{ margin: 'auto' }}
              />
              <Container>
                <Segment basic>
                  <h1 style={{ fontSize: '6em' }}>
                    <b>404</b>
                  </h1>
                  <h2>
                    <b>Página no encontrada.</b>
                  </h2>
                  <h4>Lo sentimos, la página solicitada no está disponible.</h4>
                  <Button positive onClick={() => history.goBack()}>
                    <Icon name="angle left" />
                    Regresar
                  </Button>
                  <Button positive onClick={() => history.push('/main')}>
                    <Icon name="home" />
                    Ir al inicio
                  </Button>
                </Segment>
              </Container>
            </Container>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Error;
