import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { useHistory } from 'react-router-dom';
import {
  Checkbox,
  Header,
  Icon,
  Message,
  Pagination,
  Segment,
  Table,
  Button,
} from 'semantic-ui-react';
import { DivScroll } from '../../global';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  maxMediumScrollRecord,
  mediumScrollExtra,
} from '../utils';
import Navbar from './NavbarCitasNot';
import Modal from '../Modales/ModalCita';

const Notificaciones = ({
  citas,
  fecha1,
  fecha2,
  paginas,
  handleChangePage,
  onChangeSeleccionadas,
  onClickSend,
  header,
  icon,
  citaN,
}) => {
  const [value, setValue] = React.useState('true');
  let opcion = [];
  let history = useHistory();
  const handleChangeAll = () => {
    opcion = [];

    if (value === 'true' && citas) {
      setValue('false');
      citas.map((item) => {
        console.log(item);
        if (item.pacientes.email !== null) {
          console.log(item.pacientes.email);
          opcion.push(item.cita_id);
        }
      });

      onChangeSeleccionadas('all', opcion);
    } else {
      setValue('true');
    }
  };
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar onClickSend={onClickSend} />

          <Segment>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name={icon} />
                {header}
              </Header.Content>
            </Header>
            <hr />
            <DivScroll
              style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
            >
              {citas.length > 0 && (
                <>
                  <Segment basic>
                    <Checkbox
                      toggle
                      name="checkboxRadioGroup"
                      label="Seleccionar todas"
                      value={value}
                      onChange={handleChangeAll}
                    />
                  </Segment>

                  <Table compact celled definition>
                    <Table.Body>
                      {citas.map((cita) => {
                        return (
                          <Table.Row key={cita.cita_id}>
                            <Table.Cell collapsing>
                              {value === 'false' && (
                                <Checkbox
                                  toggle
                                  name="checkboxRadioGroup"
                                  value={cita.cita_id}
                                  checked={
                                    cita.pacientes.email !== null ? true : false
                                  }
                                />
                              )}

                              {value === 'true' && (
                                <Checkbox
                                  toggle
                                  name="checkboxRadioGroup"
                                  value={cita.cita_id}
                                  onChange={(e, data) => {
                                    onChangeSeleccionadas('opcion', data);
                                  }}
                                  readOnly={
                                    cita.pacientes.email === null ? true : false
                                  }
                                />
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {cita.pacientes.email === null && (
                                <Button
                                  content="Agregar correo electrónico"
                                  icon="right arrow"
                                  labelPosition="right"
                                  style={{ float: 'right' }}
                                  onClick={() => {
                                    history.push(
                                      `/paciente_editar/${cita.paciente_id}`
                                    );
                                  }}
                                />
                              )}
                              <Icon name="calendar alternate" />
                              {fechaFormato(cita.fecha)} &nbsp; &nbsp; &nbsp;
                              <Icon name="time" /> {cita.hora}
                              <br />
                              <b>Paciente:</b>{' '}
                              {cita.pacientes.nombre +
                                ' ' +
                                cita.pacientes.apellido}
                              <br />
                              <b>Motivo cita:</b>{' '}
                              {cita.motivo_cita
                                ? cita.motivo_cita.slice(0, 300).trim()
                                : ''}
                              <br />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </>
              )}
              {citas.length === 0 && citaN && (
                <Message warning>
                  <Message.Header>
                    <Icon name="info circle" />
                    No se encontraron resultados
                  </Message.Header>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen citas registradas
                    desde el <b>{fechaFormato(fecha1)}</b> hasta el{' '}
                    <b>{fechaFormato(fecha2)}</b>
                  </p>
                </Message>
              )}
              {citas.length === 0 && !citaN && (
                <>
                  <Message info>
                    <Message.Header>
                      <Icon name="info circle" />
                      Aún no se han agendado citas
                    </Message.Header>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      color="blue"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <Icon name="plus" /> Agendar cita
                    </Button>
                  </Message>
                  <Modal existsHC={modal} close={closeModal} />
                </>
              )}
            </DivScroll>

            <Segment basic align="center">
              <Pagination
                onPageChange={handleChangePage}
                pointing
                secondary
                activePage={paginas.page}
                totalPages={paginas.totalPages}
              />
            </Segment>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Notificaciones;
