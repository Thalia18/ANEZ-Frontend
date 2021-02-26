import React from 'react';
import Media from 'react-media';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';

import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils/';
import Navbar from './Navbar';

import 'semantic-ui-css/semantic.min.css';

const Buscar = ({
  paciente,
  autoComplete,
  pageInitial,
  pageSecond,
  reload,
  optionNav,
}) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar
            autoComplete={autoComplete}
            pacienteId={paciente.paciente_id}
            pageInitial={pageInitial}
            pageSecond={pageSecond}
            reload={reload}
            optionNav={optionNav}
          />
          <Segment>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Header as='h1' textAlign='center'>
                <Header.Content>
                  <Icon name='search' />
                  Resultados de la búsqueda
                </Header.Content>
              </Header>
              <hr />
              <br />
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Apellido</Table.HeaderCell>
                    <Table.HeaderCell>Cédula</Table.HeaderCell>
                    <Table.HeaderCell>Teléfono</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row key={paciente.paciente_id}>
                    <Table.Cell>{paciente.nombre.trim()}</Table.Cell>
                    <Table.Cell>{paciente.apellido.trim()}</Table.Cell>
                    <Table.Cell>{paciente.cedula.trim()}</Table.Cell>
                    <Table.Cell>{paciente.telefono.trim()}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Buscar;
