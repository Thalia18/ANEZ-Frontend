import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Container, Icon, InputGroup, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Popup } from 'semantic-ui-react';
import { GLOBAL_MEDIA_QUERIES, stylePop } from '../../utils/';

const NavbarPacientes = ({ medicoId, popHeader, ...props }) => {
  let url =
    medicoId === undefined ? `/admin/medicos` : `/admin/medico/${medicoId}`;

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
              <Nav.Item
                icon={<Icon icon="plus-circle" />}
                componentClass={Link}
                to={`/admin/medico_agregar`}
                key={Math.random()}
              >
                Crear Médico
              </Nav.Item>
              <Nav.Item
                icon={<Icon icon="eye" />}
                componentClass={Link}
                key={medicoId}
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
                          props.history.push(`/admin/medico_buscar/${value}`);

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
