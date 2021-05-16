import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../../utils';

const NavbarPacientes = ({ onClickDelete, pacienteId, user }) => {
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
                  history.push('/pacientes');
                }}
              />
            </Nav>
            <Nav pullRight>
              <Nav.Item
                icon={<Icon icon="pencil" />}
                componentClass={Link}
                key={pacienteId}
                to={`/paciente_editar/${pacienteId}`}
              >
                Editar
              </Nav.Item>
              {user.rol.trim().toUpperCase() !== 'RECEPCIONISTA' && (
                <Nav.Item
                  onClick={onClickDelete}
                  // componentClass='button'
                  icon={<Icon icon="trash" />}
                >
                  Eliminar
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
