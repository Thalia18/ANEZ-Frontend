import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Header, Icon, Image, Segment, Table } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils/index';

const Detalle = ({ consultorio }) => {
  const styled = { fontWeight: 'bold' };
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
            <Grid>
              <Grid.Column width={4} align="center">
                <Image
                  src={consultorio.logo}
                  // size="medium"
                  rounded
                  height="200"
                  width="250"
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <br />
                <br />
                <br />

                <Table
                  fixed={matches.medium ? true : null}
                  celled
                  size={matches.medium ? 'small' : 'large'}
                >
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing style={styled}>
                        Nombre
                      </Table.Cell>
                      <Table.Cell colSpan="4">{consultorio.nombre}</Table.Cell>
                      <Table.Cell collapsing style={styled}>
                        RUC
                      </Table.Cell>
                      <Table.Cell colSpan="2">{consultorio.ruc}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell collapsing style={styled}>
                        Dirección
                      </Table.Cell>
                      <Table.Cell colSpan="4">
                        {consultorio.direccion}
                      </Table.Cell>
                      <Table.Cell collapsing style={styled}>
                        Teléfono
                      </Table.Cell>
                      <Table.Cell colSpan="2">
                        {consultorio.telefono}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
