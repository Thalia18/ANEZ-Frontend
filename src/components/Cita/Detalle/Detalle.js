import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  horaShow,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils';

const Detalle = ({ cita, medico }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="dna" /> Cita médica
            </Header.Content>
          </Header>
          <hr />
          <HCHeader paciente={cita.pacientes} />

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Table celled striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <b>Fecha y hora</b>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="calendar alternate" />
                    {fechaFormato(cita.fecha)} &nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name="time" />
                    {horaShow(cita.hora)}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <b>Médico</b>
                  </Table.Cell>
                  <Table.Cell>
                    {'DR(A). ' +
                      medico.nombre.trim().toUpperCase() +
                      ' ' +
                      medico.apellido.trim().toUpperCase()}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <b>Teléfono</b>
                  </Table.Cell>
                  <Table.Cell>{cita.pacientes.telefono}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <b>Teléfono adicional</b>
                  </Table.Cell>
                  <Table.Cell>{cita.telefono_paciente}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>
                    <b>Motivo de cita</b>
                  </Table.Cell>
                  <Table.Cell>{cita.motivo_cita}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
