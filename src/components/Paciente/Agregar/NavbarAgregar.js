import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';

import { GLOBAL_MEDIA_QUERIES } from '../../utils';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Navbar>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon='angle-left' />}
                componentClass={Link}
                to='/pacientes'
              />
              <Nav.Item
                icon={<Icon icon='save' />}
                componentClass='button'
                type='submit'
                form='formAgregar'
              >
                Guardar
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPacientes;
