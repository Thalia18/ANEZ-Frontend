import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { AutoComplete, Icon, InputGroup, Nav, Navbar } from 'rsuite';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ autoComplete, pacienteId }) => {
  let url = pacienteId === undefined ? '/pacientes' : `/paciente/${pacienteId}`;
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon='plus-circle' />}
                componentClass={Link}
                to={`/paciente_agregar`}
              >
                Agregar Paciente
              </Nav.Item>
              <Nav.Item icon={<Icon icon='heartbeat' />}>
                Agregar Historia clínica
              </Nav.Item>
              <Nav.Item icon={<Icon icon='calendar' />}>Agendar cita</Nav.Item>

              <Nav.Item
                icon={<Icon icon='eye' />}
                componentClass={Link}
                key={pacienteId}
                to={url}
              >
                Ver
              </Nav.Item>
            </Nav>
            <Nav pullRight>
              <InputGroup
                style={
                  matches.medium
                    ? { width: 250, marginBottom: 10, marginRight: 10 }
                    : { width: 400, marginTop: 10, marginRight: 10 }
                }
              >
                <AutoComplete data={autoComplete.data} />
                <InputGroup.Button>
                  <Icon icon='search' />
                </InputGroup.Button>
              </InputGroup>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarPacientes;
