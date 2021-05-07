import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import {
  Checkbox,
  Header,
  Icon,
  Message,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';
import { Global } from '../../global';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  mediumHeight,
} from '../utils';
import Navbar from './NavbarCitasNot';

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
}) => {
  const [value, setValue] = React.useState('true');
  let opcion = [];

  const handleChangeAll = () => {
    opcion = [];

    if (value === 'true' && citas) {
      setValue('false');
      citas.map((item) => {
        opcion.push(item.cita_id);
      });

      onChangeSeleccionadas('all', opcion);
    } else {
      setValue('true');
    }
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar onClickSend={onClickSend} />
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Header as="h1" textAlign="center">
                <Header.Content>
                  <Icon name={icon} />
                  {header}
                </Header.Content>
              </Header>
              <hr />

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
                                  checked={true}
                                />
                              )}

                              {value === 'true' && (
                                <Checkbox
                                  toggle
                                  name="checkboxRadioGroup"
                                  value={cita.cita_id}
                                  onChange={(e, data) => {
                                    onChangeSeleccionadas('opcion', data);

                                    //-1 no existe 2 existe
                                  }}
                                />
                              )}
                            </Table.Cell>
                            <Table.Cell>
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
              {citas.length === 0 && (
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
            </Global>
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
