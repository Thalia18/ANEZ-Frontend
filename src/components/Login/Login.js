import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Icon, Message, Segment } from 'semantic-ui-react';
import { GLOBAL_MEDIA_QUERIES } from '../utils';

const Login = ({ validateUser, formUser, handleChange, correctUser }) => {
  const color = 'rgba(0,161,213, 0.1)';
  const [passActual, setPassActual] = React.useState('password');
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment
          textAlign="center"
          style={
            matches.medium
              ? { height: '47em', background: color }
              : { height: '67em', background: color }
          }
        >
          <Segment
            style={
              matches.medium
                ? { width: '100%', margin: 'auto', marginTop: '7em' }
                : { width: '70%', margin: 'auto', marginTop: '10em' }
            }
          >
            <Grid columns={2} style={{ borderStyle: 'outset' }}>
              <Grid.Column
                verticalAlign="middle"
                width={8}
                style={{
                  background: 'rgba(26,25,25, 0.1)',
                }}
              >
                <img
                  src="https://i.ibb.co/hLjvrdL/logoANEZ.png"
                  width="100%"
                  alt="logo"
                />
              </Grid.Column>

              <Grid.Column
                width={5}
                style={{
                  margin: 'auto',
                }}
              >
                <Message negative hidden={!correctUser}>
                  <Message.Header>
                    Usuario o contraseña incorrecta
                  </Message.Header>
                </Message>
                <Form size="large" onSubmit={validateUser}>
                  <Form.Group
                    style={{ width: matches.medium ? '88%' : '91.5%' }}
                  >
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      label="Usuario"
                      placeholder="Usuario"
                      onChange={handleChange}
                      name="usuario"
                      value={formUser.usuario}
                      width={16}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      width={16}
                      icon="lock"
                      iconPosition="left"
                      label="Contraseña"
                      placeholder="Contraseña"
                      type={passActual}
                      onChange={handleChange}
                      name="contrasena"
                      value={formUser.contrasena}
                      autoComplete="on"
                      required
                    />
                    <Segment
                      style={{ cursor: 'pointer', marginLeft: '-1em' }}
                      basic
                      onClick={(e) => {
                        e.preventDefault();
                        if (passActual === 'text') {
                          setPassActual('password');
                        } else {
                          setPassActual('text');
                        }
                      }}
                    >
                      <Icon name="eye" size="large" />
                    </Segment>
                  </Form.Group>
                  <Link
                    to={'/recuperar_pass'}
                    style={{
                      // textDecoration: 'none',
                      fontSize: '0.8em',
                      color: 'gray',
                    }}
                  >
                    <Icon name="key" />
                    ¿Olvidó su contraseña?
                  </Link>
                  <br />
                  <br />

                  <Button content="Login" primary size="big" />
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment>
      )}
    </Media>
  );
};

export default Login;
