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
import { Global } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  mediumHeight,
} from '../../utils/';
import Navbar from '../Usuarios/Navbar';

const Listado = ({
  consultorios,
  header,
  icon,
  buscar,
  busqueda,
  paginas,
  handleChangePage,
}) => {
  const [value, setValue] = React.useState();
  const handleChange = (e, { value }) => {
    setValue(value);
  };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar consultorioId={value} tipo="consultorio" />
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Header as="h1" textAlign="center">
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
                      <Table.HeaderCell>Nombre</Table.HeaderCell>
                      <Table.HeaderCell>RUC</Table.HeaderCell>
                      <Table.HeaderCell>Dirección</Table.HeaderCell>
                      <Table.HeaderCell>Teléfono</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {consultorios.map((consultorio) => {
                      return (
                        <Table.Row key={consultorio.consultorio_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name="checkboxRadioGroup"
                              value={consultorio.consultorio_id}
                              checked={value === consultorio.consultorio_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>{consultorio.nombre}</Table.Cell>
                          <Table.Cell>{consultorio.ruc}</Table.Cell>
                          <Table.Cell>{consultorio.direccion}</Table.Cell>
                          <Table.Cell>{consultorio.telefono}</Table.Cell>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen consultorios
                    registrados con el dato <b>{busqueda}</b>
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

export default Listado;
