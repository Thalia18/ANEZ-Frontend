import React from 'react';
import Media from 'react-media';
import { Container } from 'rsuite';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';

import { DivScroll, Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Detalle = ({ cita }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='dna' /> Cita médica
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={cita.pacientes} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Table celled striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <b>Fecha y hora</b>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name='calendar alternate' />
                      {fechaFormato(cita.fecha)} &nbsp;&nbsp;&nbsp;&nbsp;
                      <Icon name='time' />
                      {cita.hora}
                    </Table.Cell>
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
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
