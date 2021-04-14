import React from 'react';
import Media from 'react-media';
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
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils/';
import Navbar from './Navbar';

import 'semantic-ui-css/semantic.min.css';

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
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Header as='h1' textAlign='center'>
                <Header.Content>
                  <Icon name={icon} />
                  {header}
                </Header.Content>
              </Header>
              <hr />
              <br />
              {!buscar && (
                <Table compact celled definition>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Apellidos</Table.HeaderCell>

                      <Table.HeaderCell>Nombres</Table.HeaderCell>
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
                              name='checkboxRadioGroup'
                              value={paciente.paciente_id}
                              checked={value === paciente.paciente_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>{paciente.apellido}</Table.Cell>
                          <Table.Cell>{paciente.nombre}</Table.Cell>
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
                    <Icon name='info circle' />
                    No se encontraron resultados
                  </Message.Header>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen pacientes
                    registrados con el dato <b>{busqueda}</b>
                  </p>
                </Message>
              )}
            </Global>
            <Segment basic align='center'>
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
