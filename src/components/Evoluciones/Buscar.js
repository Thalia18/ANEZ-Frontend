import React from 'react';
import Media from 'react-media';
import {
  Checkbox,
  Header,
  Icon,
  Message,
  Segment,
  Table,
} from 'semantic-ui-react';

import { Global } from '../../global';
import HCHeader from '../HistoriasClinicas/HCHeader';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils';
import Navbar from './NavbarEvolucion';

import 'semantic-ui-css/semantic.min.css';

const Listado = ({ evoluciones, paciente, fecha1, fecha2 }) => {
  const [value, setValue] = React.useState();
  const handleChange = (e, { value }) => setValue(value);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar evolucionId={value} paciente={paciente} />
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Header as='h1' textAlign='center'>
                <Header.Content>
                  <Icon name='search' />
                  Resultados de la búsqueda
                </Header.Content>
              </Header>
              <hr />
              <HCHeader paciente={paciente} />
              <br />
              {evoluciones.length > 0 && (
                <Table compact celled definition>
                  <Table.Body>
                    {evoluciones.map((evolucion) => {
                      return (
                        <Table.Row key={evolucion.evolucion_id}>
                          <Table.Cell collapsing>
                            <Checkbox
                              toggle
                              name='checkboxRadioGroup'
                              value={evolucion.evolucion_id}
                              checked={value === evolucion.evolucion_id}
                              onChange={handleChange}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <b>Fecha:</b> {evolucion.fecha}
                            <br />
                            <b>Motivo consulta:</b>{' '}
                            {evolucion.motivo_consulta.slice(0, 300).trim() +
                              '...'}
                            <br />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
              {evoluciones.length === 0 && (
                <Message warning>
                  <Message.Header>
                    <Icon name='info circle' />
                    No se encontraron resultados
                  </Message.Header>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No existen evoluciones
                    registradas desde el <b>{fecha1}</b> hasta el{' '}
                    <b>{fecha2}</b>
                  </p>
                </Message>
              )}
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Listado;
