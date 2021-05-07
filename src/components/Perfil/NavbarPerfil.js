import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../utils';

const NavbarPerfil = ({ usuario }) => {
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
                icon={<Icon icon="edit" />}
                componentClass={Link}
                key={usuario}
                to={`/perfil_actualizar/${usuario}`}
              >
                Actualizar datos
              </Nav.Item>
              <Nav.Item
                icon={<Icon icon="key" />}
                componentClass={Link}
                key={usuario}
                to={`/perfil_pass/${usuario}`}
              >
                Cambiar contraseña
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPerfil;
