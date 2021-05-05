import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Container,
  Form,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils';

const RecuperarPass = ({ formUser, handleChange, onClickValidateUser }) => {
  let history = useHistory();
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Container
              style={{
                height: '100%',
                width: '100%',
                background: 'rgba(0,161,213, 0.1)',
                textAlign: 'center',
              }}
            >
              <Link to="/">
                <Image
                  style={{ margin: 'auto', paddingTop: '10%' }}
                  src="https://i.ibb.co/FxBVRvG/circle-cropped.png"
                  size="small"
                />
              </Link>
              <br />
              <Segment style={{ margin: 'auto', width: '50%' }}>
                <Form onSubmit={onClickValidateUser}>
                  <Form.Input
                    placeholder="Usuario"
                    label="Ingrese su nombre de usuario"
                    width={16}
                    onChange={handleChange}
                    name="usuario"
                    value={formUser.usuario}
                    required
                  />
                  <br />
                  <Container style={{ textAlign: 'center' }}>
                    <Button>
                      <Icon name="redo" />
                      Restaurar contraseña
                    </Button>
                    <Button onClick={() => history.push('/')}>
                      <Icon name="angle left" />
                      Regresar
                    </Button>
                  </Container>
                </Form>
              </Segment>
            </Container>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default RecuperarPass;
