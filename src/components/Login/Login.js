import React from 'react';
import Media from 'react-media';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils';

const Login = ({ validateUser, formUser, handleChange, correctUser }) => {
  const color = 'rgba(0,161,213, 0.1)';
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment
          textAlign='center'
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
                verticalAlign='middle'
                width={8}
                style={{
                  background: 'rgba(26,25,25, 0.1)',
                }}
              >
                <img src='https://i.ibb.co/hLjvrdL/logoANEZ.png' width='100%' />
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
                <Form size='large' onSubmit={validateUser}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Usuario'
                    placeholder='Usuario'
                    onChange={handleChange}
                    name='usuario'
                    value={formUser.usuario}
                    required
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Contraseña'
                    placeholder='Contraseña'
                    type='password'
                    onChange={handleChange}
                    name='contrasena'
                    value={formUser.contrasena}
                    autoComplete='on'
                    required
                  />
                  <br />
                  <Button content='Login' primary size='big' />
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
