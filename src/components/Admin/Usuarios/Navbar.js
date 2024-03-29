import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Container, Icon, InputGroup, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Popup } from 'semantic-ui-react';
import { GLOBAL_MEDIA_QUERIES, stylePop } from '../../utils/';

const NavbarPacientes = ({
  usuarioId,
  consultorioId,
  tipo,
  popHeader,
  ...props
}) => {
  let url =
    usuarioId === undefined ? `/admin/usuarios` : `/admin/usuario/${usuarioId}`;
  let urlC =
    consultorioId === undefined
      ? `/admin/consultorios`
      : `/admin/consultorio/${consultorioId}`;

  let pushBuscar1 = (value) => {
    let a = tipo === 'usuario' ? `/admin/usuarios` : `/admin/consultorios`;
    return a;
  };
  let pushBuscar2 = (value) => {
    let a =
      tipo === 'usuario'
        ? `/admin/usuarios_buscar/${value}`
        : `/admin/consultorios_buscar/${value}`;
    return a;
  };
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
                  icon={<Icon icon="angle-left" />}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}

              {tipo === 'usuario' && (
                <React.Fragment>
                  <Nav.Item
                    icon={<Icon icon="plus-circle" />}
                    componentClass={Link}
                    to={`/admin/usuario_agregar`}
                    key={Math.random()}
                  >
                    Crear Usuario
                  </Nav.Item>
                  <Nav.Item
                    icon={<Icon icon="eye" />}
                    componentClass={Link}
                    key={usuarioId}
                    to={url}
                  >
                    Ver
                  </Nav.Item>
                </React.Fragment>
              )}
              {tipo === 'consultorio' && (
                <React.Fragment>
                  <Nav.Item
                    icon={<Icon icon="plus-circle" />}
                    componentClass={Link}
                    to={`/admin/consultorio_agregar`}
                    key={Math.random()}
                  >
                    Crear Consultorio
                  </Nav.Item>
                  <Nav.Item
                    icon={<Icon icon="eye" />}
                    componentClass={Link}
                    key={consultorioId}
                    to={urlC}
                  >
                    Ver
                  </Nav.Item>
                </React.Fragment>
              )}
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
                      <Popup
                        style={stylePop}
                        inverted
                        content={popHeader}
                        trigger={
                          <Form.Input
                            placeholder="Buscar"
                            onChange={(e) => {
                              setValue(e.target.value);
                            }}
                          />
                        }
                      />

                      <Button
                        onClick={() => {
                          value === ''
                            ? props.history.push(pushBuscar1(value))
                            : props.history.push(pushBuscar2(value));
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
                        <Icon icon="search" />
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
