import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';

import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../../utils';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ onClickDelete, pacienteId }) => {
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
                  history.go(-2);
                }}
              />
            </Nav>
            <Nav pullRight>
              <Nav.Item
                icon={<Icon icon='pencil' />}
                componentClass={Link}
                key={pacienteId}
                to={`/paciente_editar/${pacienteId}`}
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
