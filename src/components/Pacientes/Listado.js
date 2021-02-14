import React from 'react';
import Media from 'react-media';
import { Checkbox, Header, Icon, Segment, Table } from 'semantic-ui-react';

import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES } from '../utils/';
import Navbar from './Navbar';

import 'semantic-ui-css/semantic.min.css';

const Listado = ({ pacientes, autoComplete }) => {
  const [value, setValue] = React.useState();
  const handleChange = (e, { value }) => setValue(value);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar autoComplete={autoComplete} pacienteId={value} />
          <Segment>
            <Global
              style={matches.medium ? { height: '30em' } : { height: '50em' }}
            >
              <Header as='h1' textAlign='center'>
                <Header.Content>
                  <Icon name='users' />
                  Pacientes
                </Header.Content>
              </Header>
              <hr />
              <br />
              <Table compact celled definition>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Apellido</Table.HeaderCell>
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
                        <Table.Cell>{paciente.nombre}</Table.Cell>
                        <Table.Cell>{paciente.apellido}</Table.Cell>
                        <Table.Cell>{paciente.cedula}</Table.Cell>
                        <Table.Cell>{paciente.telefono}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};

export default Listado;
