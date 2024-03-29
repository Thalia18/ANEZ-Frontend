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
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../utils/';
import Navbar from './Navbar';

const Listado = ({
  pacientes,
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
                      <Table.HeaderCell>Nombre completo</Table.HeaderCell>

                      <Table.HeaderCell>Cédula</Table.HeaderCell>
                      <Table.HeaderCell>Teléfono</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {pacientes.map((paciente) => {
                      return (
                        <Table.Row key={paciente.paciente_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name="checkboxRadioGroup"
                              value={paciente.paciente_id}
                              checked={value === paciente.paciente_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            {paciente.apellido} {paciente.nombre}
                          </Table.Cell>
                          <Table.Cell>{paciente.cedula}</Table.Cell>
                          <Table.Cell>{paciente.telefono}</Table.Cell>
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
                    registrados con el dato <b>{busqueda}</b>
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
