import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Container, DateRangePicker, Icon, Nav, Navbar } from 'rsuite';
import { Button, Form } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ evolucionId, paciente, ...props }) => {
  let history = useHistory();

  let url =
    evolucionId === undefined
      ? `/evoluciones/${props.match.params.historiaId}`
      : `/evolucion/${evolucionId}/${props.match.params.historiaId}`;
  let urlReceta =
    evolucionId === undefined
      ? `/evoluciones/${props.match.params.historiaId}`
      : `/receta/${evolucionId}`;

  const [value, setValue] = React.useState([]);
  const fecha = (date) => {
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let año = date.getFullYear();
    return año + '-' + mes + '-' + dia;
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={{ background: 'rgba(0,161,213, 0.1)' }}>
          <Navbar.Body>
            <Nav>
              {!matches.medium && (
                <Nav.Item
                  icon={<Icon icon='angle-left' />}
                  // componentClass={Link}
                  // to={`/historia_clinica/${paciente.paciente_id}`}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}
              <Nav.Item
                icon={<Icon icon='file-text' />}
                componentClass={Link}
                key={evolucionId}
                to={urlReceta}
              >
                Generar receta
              </Nav.Item>
              <Nav.Item
                icon={<Icon icon='eye' />}
                componentClass={Link}
                key={evolucionId}
                to={url}
              >
                Ver
              </Nav.Item>
            </Nav>
            <Nav pullRight style={{ marginTop: '0.8em', marginRight: '1em' }}>
              <Container style={{ marginTop: '-0.1em' }}>
                <Form>
                  <DateRangePicker
                    showOneCalendar
                    placeholder='Buscar'
                    style={{ width: 280 }}
                    value={value}
                    onChange={(value) => {
                      setValue(Object.values(value));
                    }}
                  />
                  <Button
                    onClick={() => {
                      value.length === 0
                        ? window.location.reload()
                        : props.history.push(
                            `/evolucion_buscar/${
                              props.match.params.historiaId
                            }/${fecha(value[0])}/${fecha(value[1])}`
                          );
                      window.location.reload();
                    }}
                  >
                    <Icon icon='search' />
                  </Button>
                </Form>
              </Container>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default withRouter(NavbarPacientes);
