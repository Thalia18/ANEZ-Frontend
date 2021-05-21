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
import Navbar from '../Pacientes/Navbar';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../utils/';

const Listado = ({
  HC,
  pageInitial,
  pageSecond,
  reload,
  optionNav,
  header,
  icon,
  buscar,
  busqueda,
  paginas,
  handleChangePage,
  user,
}) => {
  const [value, setValue] = React.useState();
  const handleChange = (e, { value }) => setValue(value);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar
            pacienteId={value}
            pageInitial={pageInitial}
            pageSecond={pageSecond}
            reload={reload}
            optionNav={optionNav}
            user={user}
          />
          <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name={icon} />
                {header}
              </Header.Content>
            </Header>
            <hr />
            <br />
            <DivScroll
              style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
            >
              {!buscar && (
                <Table compact celled definition data-testid="componentTest">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>No. Historia clínica</Table.HeaderCell>

                      <Table.HeaderCell>Paciente</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {HC.map((historia) => {
                      return (
                        <Table.Row key={historia.paciente_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name="checkboxRadioGroup"
                              value={historia.paciente_id}
                              checked={value === historia.paciente_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell width={3}>
                            {historia.historia_clinica_id}
                          </Table.Cell>
                          <Table.Cell width={13}>
                            {historia.pacientes.apellido}{' '}
                            {historia.pacientes.nombre}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}

              {buscar && (
                <Message warning>
                  <Message.Header>
                    <Icon name="info circle" />
                    No se encontraron resultados
                  </Message.Header>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen pacientes
                    registrados con el Nombre, Apellido o Cédula{' '}
                    <b>{busqueda}</b>
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

export default Listado;
