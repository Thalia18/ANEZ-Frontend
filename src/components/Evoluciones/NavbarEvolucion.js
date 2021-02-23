import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { DateRangePicker, Icon, InputGroup, Nav, Navbar } from 'rsuite';
import { Button, Form, Grid, Search } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ autoComplete, historiaId, ...props }) => {
  let url =
    historiaId === undefined ? '/evolucion' : `/evolucion/${historiaId}`;

  let history = useHistory();
  const [value, setValue] = React.useState([]);

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={{ background: 'rgba(0,161,213, 0.1)' }}>
          <Navbar.Body>
            <Nav>
              {!matches.medium && (
                <Nav.Item
                  icon={<Icon icon='angle-left' />}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}
              <Nav.Item
                icon={<Icon icon='file-text' />}
                componentClass={Link}
                key={historiaId}
                to={url}
              >
                Generar receta
              </Nav.Item>
              <Nav.Item
                icon={<Icon icon='eye' />}
                componentClass={Link}
                key={historiaId}
                to={url}
              >
                Ver
              </Nav.Item>
            </Nav>
            <Nav pullRight style={{ marginTop: '0.8em', marginRight: '1em' }}>
              <DateRangePicker
                showOneCalendar
                placeholder='Buscar'
                style={{ width: 280 }}
                value={value}
                onChange={(value) => {
                  setValue(Object.values(value));
                }}
              />
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default withRouter(NavbarPacientes);
