import React from 'react';
import Media from 'react-media';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, DateRangePicker, Icon, Nav, Navbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form } from 'semantic-ui-react';
import { GLOBAL_MEDIA_QUERIES } from '../utils';

const NavbarCitas = ({ onClickSend, verNav, citaId, ...props }) => {
  let history = useHistory();
  let url =
    citaId === undefined
      ? `/citas_buscar/${props.match.params.fecha1}/${props.match.params.fecha2}`
      : `/cita_detalle/${citaId}`;
  const [value, setValue] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  const fecha = (date) => {
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let año = date.getFullYear();
    return año + '-' + mes + '-' + dia;
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={{ background: 'rgba(0,161,213, 0.1)' }}>
          <Navbar.Body>
            <Nav>
              {!matches.medium && (
                <Nav.Item
                  icon={<Icon icon="angle-left" />}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}

              <Nav.Item icon={<Icon icon="send" />} onClick={onClickSend}>
                Enviar notificaciones
              </Nav.Item>
            </Nav>
            <Nav pullRight style={{ marginTop: '0.8em', marginRight: '1em' }}>
              <Container style={{ marginTop: '-0.1em' }}>
                <Form>
                  <DateRangePicker
                    showOneCalendar
                    placeholder="Buscar"
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
                            `/citas__buscar_notificacion/${fecha(
                              value[0]
                            )}/${fecha(value[1])}`
                          );
                      window.location.reload();
                    }}
                  >
                    <Icon icon="search" />
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

export default withRouter(NavbarCitas);
