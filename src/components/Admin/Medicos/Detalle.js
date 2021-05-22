import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  HeaderCell,
  HeaderSubCell,
} from '../../Paciente/Detalle/DetalleStyles';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils/index';

const Detalle = ({ medico }) => {
  const styled = { fontWeight: 'bold' };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="dna" /> Datos Médico
            </Header.Content>
          </Header>
          <hr />
          <br />
          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Table celled size={matches.medium ? 'small' : 'large'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                    <HeaderCell>
                      <Icon name="user" /> {medico.usuario.nombre}{' '}
                      {medico.usuario.apellido}
                      <br />
                      <br />
                      <Icon name="user circle" /> {medico.usuario.usuario}
                    </HeaderCell>

                    <HeaderSubCell>
                      <Icon name="vcard" />
                      {medico.usuario.cedula}
                    </HeaderSubCell>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {medico.especialidad && (
                  <Table.Row>
                    <Table.Cell collapsing style={styled}>
                      Especialidades
                    </Table.Cell>
                    <Table.Cell colSpan="8">
                      {medico.especialidad.map((item) => {
                        return <p key={item.id}>{item.value}</p>;
                      })}
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
