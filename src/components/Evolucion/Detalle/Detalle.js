import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import {
  Grid,
  Header,
  Icon,
  Image,
  Modal,
  Segment,
  Table,
} from 'semantic-ui-react';

import { DivScroll, Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Detalle = ({ paciente, evolucion, fotos, fotosExist }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='dna' /> Evolución
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Table celled striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={3}>
                      <b>Fecha</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.fecha}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={3}>
                      <b>Motivo de consulta</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.motivo_consulta}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Fecha última menstruación</b>
                    </Table.Cell>
                    <Table.Cell>
                      {evolucion.fecha_ultima_menstruacion}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Procedimiento</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.procedimiento}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Diagnóstico</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.diagnostico}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Medicación</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.medicacion}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Indicaciones</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.indicacion}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Próximo control</b>
                    </Table.Cell>
                    <Table.Cell>{evolucion.proximo_control}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <b>Fotos</b>
              {fotosExist && (
                <Segment>
                  <Grid columns={4}>
                    <Grid.Row>
                      {fotos.map((foto) => {
                        return (
                          <Modal
                            key={foto.foto_id}
                            basic
                            closeIcon
                            onClose={() => setOpen(false)}
                            trigger={
                              <Grid.Column>
                                <Image
                                  src={foto.foto_url}
                                  rounded
                                  style={
                                    matches.medium
                                      ? {
                                          height: '6em',
                                          width: '11em',
                                          cursor: 'zoom-in',
                                        }
                                      : {
                                          height: '10em',
                                          width: '15em',
                                          cursor: 'zoom-in',
                                        }
                                  }
                                />
                                <br />
                              </Grid.Column>
                            }
                          >
                            <Modal.Content image>
                              <Image
                                src={foto.foto_url}
                                style={
                                  matches.medium
                                    ? {
                                        height: '25em',
                                        width: 'auto',
                                      }
                                    : {
                                        height: '35em',
                                        width: 'auto',
                                      }
                                }
                                centered
                                rounded
                              />
                            </Modal.Content>
                          </Modal>
                        );
                      })}
                    </Grid.Row>
                  </Grid>
                </Segment>
              )}
            </DivScroll>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
