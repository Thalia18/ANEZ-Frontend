import React from 'react';
import { AutoComplete, Icon, InputGroup, Nav, Navbar } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = () => {
  return (
    <div>
      <Navbar>
        <Navbar.Body>
          <Nav>
            <Nav.Item icon={<Icon icon='calendar' />}>Agendar cita</Nav.Item>
            <Nav.Item icon={<Icon icon='heartbeat' />}>
              Agregar Historia clínica
            </Nav.Item>

            <Nav.Item icon={<Icon icon='pencil' />}>Editar</Nav.Item>
            <Nav.Item icon={<Icon icon='trash' />}>Eliminar</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </div>
  );
};

export default NavbarPacientes;
