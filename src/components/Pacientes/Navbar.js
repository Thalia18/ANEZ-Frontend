import React from 'react';
import { Navbar, Nav, Icon, InputGroup, AutoComplete } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ autoComplete }) => {
  return (
    <div>
      <Navbar>
        <Navbar.Body>
          <Nav pullRight>
            <InputGroup style={{ width: 400, marginTop: 10, marginRight: 10 }}>
              <AutoComplete data={autoComplete.data} />
              <InputGroup.Button>
                <Icon icon='search' />
              </InputGroup.Button>
            </InputGroup>
          </Nav>
          <Nav>
            <Nav.Item icon={<Icon icon='people-group' />}>
              Agregar Paciente
            </Nav.Item>
            <Nav.Item icon={<Icon icon='eye' />}>Ver</Nav.Item>
            <Nav.Item icon={<Icon icon='pencil' />}>Editar</Nav.Item>
            <Nav.Item icon={<Icon icon='trash' />}>Eliminar</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </div>
  );
};

export default NavbarPacientes;
