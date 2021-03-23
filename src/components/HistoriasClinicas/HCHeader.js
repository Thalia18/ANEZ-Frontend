import React from 'react';
import { Icon, Segment, Table } from 'semantic-ui-react';

import { calculaEdad, GLOBAL_MEDIA_QUERIES } from '../utils';

import 'semantic-ui-css/semantic.min.css';

const HCHeader = ({ paciente }) => {
  let edad = calculaEdad(paciente.fecha_nacimiento);

  return (
    <Segment secondary>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Icon name='user' /> <b>Datos del paciente</b>
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
