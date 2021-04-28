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
                textAlign: 'center',
                marginTop: '10%',
              }}
            >
              <Image
                src="https://i.ibb.co/gFp88qR/undraw-server-down-s4lk.png"
                size="big"
                style={{ margin: 'auto' }}
              />
              <Container>
                <Segment basic>
                  <h1 style={{ fontSize: '3em' }}>
                    <b>Ops, algo salió mal...</b>
                  </h1>
                  <h4> Por favor inténtelo nuevamente.</h4>
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
