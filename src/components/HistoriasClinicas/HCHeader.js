import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Segment, Table, Button } from 'semantic-ui-react';
import { calculaEdad } from '../utils';
import { useHistory } from 'react-router-dom';

const HCHeader = ({ paciente }) => {
  let edad = calculaEdad(paciente.fecha_nacimiento);
  let history = useHistory();
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
            {paciente.fecha_nacimiento !== null && (
              <Table.Cell>
                <b>Edad:</b> {edad}
              </Table.Cell>
            )}
            <Table.Cell>
              <Button
                onClick={() =>
                  history.push(`/paciente/${paciente.paciente_id}`)
                }
              >
                <Icon name="eye" />
                Ver
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row style={{ float: 'letf' }}></Table.Row>
        </Table.Header>
      </Table>
    </Segment>
  );
};

export default HCHeader;
