import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon, Image, Segment, Table } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils/index';

const Detalle = ({ consultorio }) => {
  const styled = { fontWeight: 'bold', background: '	#F5F5F5' };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="dna" /> Datos Consultorio
            </Header.Content>
          </Header>
          <hr />
          <br />
          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Image
              src={consultorio.logo}
              rounded
              height={matches.medium ? '130' : '230'}
              width={matches.medium ? '150' : '250'}
              style={{ margin: 'auto' }}
            />

            <br />
            <br />

            <Table celled size={matches.medium ? 'small' : 'large'}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell style={styled}>Nombre</Table.Cell>
                  <Table.Cell colSpan="4">{consultorio.nombre}</Table.Cell>
                  <Table.Cell style={styled}>RUC</Table.Cell>
                  <Table.Cell colSpan="2">{consultorio.ruc}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell style={styled}>Dirección</Table.Cell>
                  <Table.Cell colSpan="4">{consultorio.direccion}</Table.Cell>
                  <Table.Cell style={styled}>Teléfono</Table.Cell>
                  <Table.Cell colSpan="2">{consultorio.telefono}</Table.Cell>
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
