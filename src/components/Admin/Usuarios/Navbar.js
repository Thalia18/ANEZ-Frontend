import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Container, Icon, InputGroup, Nav, Navbar } from 'rsuite';
import { Button, Form } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ usuarioId, ...props }) => {
  let url =
    usuarioId === undefined ? `/admin/usuarios` : `/admin/usuario/${usuarioId}`;

  let history = useHistory();
  let [value, setValue] = React.useState('');
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={{ background: 'rgba(0,161,213, 0.1)' }}>
          <Navbar.Body>
            <Nav>
              {!matches.medium && (
                <Nav.Item
                  icon={<Icon icon='angle-left' />}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}

              <React.Fragment>
                <Nav.Item
                  icon={<Icon icon='plus-circle' />}
                  componentClass={Link}
                  to={`/admin/usuario_agregar`}
                  key={Math.random()}
                >
                  Crear Usuario
                </Nav.Item>
              </React.Fragment>

              <Nav.Item
                icon={<Icon icon='eye' />}
                componentClass={Link}
                key={usuarioId}
                to={url}
              >
                Ver
              </Nav.Item>
            </Nav>
            <Nav pullRight>
              <Container
                style={{
                  marginTop: '0.2em',
                  marginBottom: '-0.8em',
                  marginRight: '1em',
                }}
              >
                <InputGroup inside>
                  <Form>
                    <Form.Group inline>
                      <Form.Input
                        placeholder='Buscar'
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                      />

                      <Button
                        onClick={() => {
                          value === ''
                            ? props.history.push('/admin/usuarios')
                            : props.history.push(`/admin/usuario_buscar/1`);
                          window.location.reload();
                        }}
                        style={
                          matches.medium
                            ? { marginLeft: '-1.3em', marginTop: '0.5em' }
                            : {
                                marginLeft: '-1.3em',
                                marginTop: '0.4em',
                              }
                        }
                      >
                        <Icon icon='search' />
                      </Button>
                    </Form.Group>
                  </Form>
                </InputGroup>
              </Container>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default withRouter(NavbarPacientes);
