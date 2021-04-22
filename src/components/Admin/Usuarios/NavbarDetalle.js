import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';

import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../../utils';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ onClickDelete, usuarioId, onClickRecuperar }) => {
  let history = useHistory();
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Navbar style={colorBackground}>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon='angle-left' />}
                onClick={() => {
                  history.goBack();
                }}
              />
            </Nav>

            <Nav pullRight>
              <Nav.Item
                onClick={onClickRecuperar}
                // componentClass='button'
                icon={<Icon icon='key' />}
              >
                Recuperar contraseña
              </Nav.Item>
              <Nav.Item
                icon={<Icon icon='pencil' />}
                componentClass={Link}
                key={usuarioId}
                to={`/admin/usuario_editar/${usuarioId}`}
              >
                Editar
              </Nav.Item>

              <Nav.Item
                onClick={onClickDelete}
                // componentClass='button'
                icon={<Icon icon='trash' />}
              >
                Eliminar
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPacientes;
