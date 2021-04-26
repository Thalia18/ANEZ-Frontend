import React from 'react';
import Media from 'react-media';
import { Link, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../../utils';

const NavbarPacientes = ({
  onClickDelete,
  usuarioId,
  onClickRecuperar,
  tipo,
  consultorioId,
}) => {
  let history = useHistory();
  let url =
    tipo === 'usuario'
      ? `/admin/usuario_editar/${usuarioId}`
      : `/admin/consultorio_editar/${consultorioId}`;

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
            </Nav>

            <Nav pullRight>
              {tipo === 'usuario' && (
                <Nav.Item
                  onClick={onClickRecuperar}
                  // componentClass='button'
                  icon={<Icon icon="key" />}
                >
                  Recuperar contraseña
                </Nav.Item>
              )}
              <Nav.Item
                icon={<Icon icon="pencil" />}
                componentClass={Link}
                key={usuarioId}
                to={url}
              >
                Editar
              </Nav.Item>

              <Nav.Item
                onClick={onClickDelete}
                // componentClass='button'
                icon={<Icon icon="trash" />}
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
