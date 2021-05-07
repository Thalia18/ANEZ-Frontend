import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Button, Icon, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../utils';

const NavbarPacientes = ({ buttonDisable, usuario, opcion }) => {
  let history = useHistory();
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Navbar style={colorBackground}>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon="angle-left" />}
                onClick={() => {
                  history.goBack();
                }}
              />
              <Nav.Item
                icon={<Icon icon="user-info" />}
                componentClass={Link}
                key={usuario}
                to={`/perfil/${usuario}`}
              >
                Perfil
              </Nav.Item>

              {opcion === 'pass' && (
                <Nav.Item
                  icon={<Icon icon="edit" />}
                  componentClass={Link}
                  key={usuario}
                  to={`/perfil_actualizar/${usuario}`}
                >
                  Actualizar datos
                </Nav.Item>
              )}
              {opcion === 'datos' && (
                <Nav.Item
                  icon={<Icon icon="key" />}
                  componentClass={Link}
                  key={usuario}
                  to={`/perfil_pass/${usuario}`}
                >
                  Cambiar contraseña
                </Nav.Item>
              )}
            </Nav>
            <Nav pullRight>
              {buttonDisable && (
                <Nav.Item icon={<Icon icon="save" />}>Guardar</Nav.Item>
              )}
              {!buttonDisable && (
                <Nav.Item>
                  <Button
                    form="formAgregar"
                    type="submit"
                    style={{
                      width: '6em',
                      height: '3em',
                      marginTop: '-0.7em',
                      background: 'rgba(0,161,213, 0.01)',
                    }}
                  >
                    <Icon icon="save" /> Guardar
                  </Button>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPacientes;
