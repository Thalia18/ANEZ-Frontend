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
  medicos,
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
          <Navbar
            medicoId={value}
            popHeader={'Ingrese Nombre, Apellido o Cédula del médico'}
          />
          <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
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
                      <Table.HeaderCell>Nombre completo</Table.HeaderCell>
                      <Table.HeaderCell>Teléfono</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {medicos.map((medico) => {
                      return (
                        <Table.Row key={medico.usuario_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name='checkboxRadioGroup'
                              value={medico.medico_id}
                              checked={value === medico.medico_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            {medico.usuario.apellido || medico.apellido}{' '}
                            {medico.usuario.nombre || medico.nombre}
                          </Table.Cell>
                          <Table.Cell>
                            {medico.usuario.telefono || medico.telefono}
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
                    <Icon name='info circle' />
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
