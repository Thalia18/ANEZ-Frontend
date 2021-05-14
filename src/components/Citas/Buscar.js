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
import { DivScroll } from '../../global';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../utils';
import Navbar from './NavbarCitas';

const Buscar = ({ citas, fecha1, fecha2, paginas, handleChangePage, user }) => {
  const [value, setValue] = React.useState();
  const handleChange = (e, { value }) => setValue(value);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar verNav={true} citaId={value} user={user} />
          <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name="search" />
                Resultados de la búsqueda
              </Header.Content>
            </Header>
            <hr />
            <br />
            <DivScroll
              style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
            >
              {citas.length > 0 && (
                <Table compact celled definition>
                  <Table.Body>
                    {citas.map((cita) => {
                      return (
                        <Table.Row key={cita.cita_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name="checkboxRadioGroup"
                              value={cita.cita_id}
                              checked={value === cita.cita_id}
                              onChange={handleChange}
                            />
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

export default Buscar;
