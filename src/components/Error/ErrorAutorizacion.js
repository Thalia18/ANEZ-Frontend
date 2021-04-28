import { React } from 'react';
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
                src="https://i.ibb.co/YtFtWrn/undraw-secure-login-pdn4.png"
                size={matches.medium ? 'medium' : 'big'}
                style={{ margin: 'auto' }}
              />
              <Container>
                <Segment basic>
                  <h1 style={{ fontSize: '3em' }}>
                    <b>Acceso restringido.</b>
                  </h1>
                  <h2>
                    <b>No tiene permisos para acceder a esta página.</b>
                  </h2>
                  <h4>Por favor contáctese con el administrador.</h4>

                  <Button positive onClick={() => history.push('/')}>
                    <Icon name="arrow alternate circle right" /> &nbsp; Login
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
