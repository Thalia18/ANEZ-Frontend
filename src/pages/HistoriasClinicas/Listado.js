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
import { DivScroll } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils/';
import Navbar from './Navbar';

const Listado = ({
  usuarios,
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
          <Navbar usuarioId={value} tipo="usuario" />
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
                <Table compact celled definition>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Apellidos</Table.HeaderCell>
                      <Table.HeaderCell>Nombres</Table.HeaderCell>
                      <Table.HeaderCell>Usuario</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {usuarios.map((usuario) => {
                      return (
                        <Table.Row key={usuario.usuario_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name="checkboxRadioGroup"
                              value={usuario.usuario_id}
                              checked={value === usuario.usuario_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>{usuario.apellido}</Table.Cell>
                          <Table.Cell>{usuario.nombre}</Table.Cell>
                          <Table.Cell>{usuario.usuario}</Table.Cell>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen usuarios
                    registrados con el Nombre, Apellido o Usuario{' '}
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
