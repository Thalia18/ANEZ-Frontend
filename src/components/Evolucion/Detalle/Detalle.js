import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import {
  Grid,
  Header,
  Icon,
  Image,
  Modal,
  Segment,
  Table,
} from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollHC,
  mediumHeight,
  mediumScrollExtra,
  saltos,
} from '../../utils';

const Detalle = ({ paciente, evolucion }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="dna" /> Evolución
            </Header.Content>
          </Header>
          <hr />
          <HCHeader paciente={paciente} />

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollHC}
          >
            <Segment basic textAlign="center">
              <Icon name="calendar alternate" />
              {fechaFormato(evolucion.fecha)}
            </Segment>
            <Table celled striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={3}>
                    <b>Motivo de consulta</b>
                  </Table.Cell>
                  <Table.Cell style={saltos}>
                    {evolucion.motivo_consulta}
                  </Table.Cell>
                </Table.Row>
                {paciente.genero_id === 1 && (
                  <Table.Row>
                    <Table.Cell>
                      <b>Fecha última menstruación</b>
                    </Table.Cell>
                    <Table.Cell>
                      {evolucion.fecha_ultima_menstruacion
                        ? fechaFormato(evolucion.fecha_ultima_menstruacion)
                        : ''}
                    </Table.Cell>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Cell>
                    <b>Procedimiento</b>
                  </Table.Cell>
                  <Table.Cell style={saltos}>
                    {evolucion.procedimiento}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Diagnóstico</b>
                  </Table.Cell>
                  <Table.Cell>{evolucion.diagnostico}</Table.Cell>
                </Table.Row>
                {evolucion.diagnostico_cie10.length > 0 && (
                  <Table.Row>
                    <Table.Cell style={saltos}>
                      <b>Diagnóstico CIE 10</b>
                    </Table.Cell>
                    <Table.Cell>
                      {evolucion.diagnostico_cie10.map((item) => {
                        return (
                          <p key={item.id}>
                            {item.value}
                            <br />
                          </p>
                        );
                      })}
                    </Table.Cell>
                  </Table.Row>
                )}

                <Table.Row>
                  <Table.Cell>
                    <b>Próximo control</b>
                  </Table.Cell>
                  <Table.Cell>
                    {evolucion.proximo_control
                      ? fechaFormato(evolucion.proximo_control)
                      : ''}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Segment basic>
              <Icon name="pills" />
              <b>Receta</b>
            </Segment>
            <Table celled striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={3}>
                    <b>Medicación</b>
                  </Table.Cell>
                  <Table.Cell style={saltos}>{evolucion.medicacion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Indicaciones</b>
                  </Table.Cell>
                  <Table.Cell style={saltos}>{evolucion.indicacion}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {evolucion.foto.length > 0 && evolucion.foto[0].value !== '' && (
              <React.Fragment>
                <Segment basic>
                  <Icon name="picture" />
                  <b>Fotos</b>
                </Segment>
                <Segment>
                  <Grid columns={4}>
                    <Grid.Row>
                      {evolucion.foto.map((foto) => {
                        return (
                          <Modal
                            key={foto.id}
                            basic
                            closeIcon
                            onClose={() => setOpen(false)}
                            trigger={
                              <Grid.Column>
                                <Image
                                  src={foto.value}
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
                                src={foto.value}
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
              </React.Fragment>
            )}
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
