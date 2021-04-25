import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Segment, Table } from 'semantic-ui-react';
import { calculaEdad } from '../utils';

const HCHeader = ({ paciente }) => {
  let edad = calculaEdad(paciente.fecha_nacimiento);

  return (
    <Segment secondary>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Icon name="user" /> <b>Datos del paciente</b>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>Nombres:</b> {paciente.nombre} <br />
              <b>Apellidos:</b> {paciente.apellido}
            </Table.Cell>
            <Table.Cell>
              <b>Edad:</b> {edad}
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    </Segment>
  );
};

export default HCHeader;
