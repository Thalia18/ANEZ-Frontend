import React from 'react';
import { Segment, Table, Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Listado = ({ pacientes }) => {
  const [value, setValue] = React.useState('');
  const handleChange = (e, { value }) => setValue(value);
  return (
    <Segment style={{ height: '60em' }}>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Cédula</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
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
                <Table.Cell>{paciente.cedula}</Table.Cell>
                <Table.Cell>{paciente.nombre}</Table.Cell>
                <Table.Cell>{paciente.apellido}</Table.Cell>
                <Table.Cell>{paciente.telefono}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default Listado;
