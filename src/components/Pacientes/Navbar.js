import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { AutoComplete, Icon, InputGroup, Nav, Navbar } from 'rsuite';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ autoComplete, pacienteId }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar>
          <Navbar.Body>
            <Nav pullRight>
              <InputGroup
                style={
                  matches.medium
                    ? { width: 100, marginTop: 10 }
                    : { width: 400, marginTop: 10, marginRight: 10 }
                }
              >
                <AutoComplete data={autoComplete.data} />
                <InputGroup.Button>
                  <Icon icon='search' />
                </InputGroup.Button>
              </InputGroup>
            </Nav>
            <Nav>
              <Link key={pacienteId} to={`/paciente`}>
                <Nav.Item
                  icon={<Icon icon='people-group' />}
                  componentClass='div'
                >
                  Agregar Paciente
                </Nav.Item>
              </Link>
              <Link key={pacienteId} to={`/paciente/${pacienteId}`}>
                <Nav.Item icon={<Icon icon='eye' />} componentClass='div'>
                  Ver
                </Nav.Item>
              </Link>
              <Nav.Item icon={<Icon icon='pencil' />}>Editar</Nav.Item>
              <Nav.Item icon={<Icon icon='trash' />}>Eliminar</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPacientes;
