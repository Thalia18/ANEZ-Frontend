import React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { GLOBAL_MEDIA_QUERIES, calculaEdad } from '../utils';

const HCHeader = ({ paciente }) => {
  let edad = calculaEdad(paciente.fecha_nacimiento);

  return (
    <Segment>
      <Table size='large'>
        <Table.Header>
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
