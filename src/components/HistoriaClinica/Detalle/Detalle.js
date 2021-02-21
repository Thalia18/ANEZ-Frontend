import React from 'react';
import Media from 'react-media';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Global } from '../../../global';
import { GLOBAL_MEDIA_QUERIES, calculaEdad } from '../../utils';

import 'semantic-ui-css/semantic.min.css';
import HCHeader from '../../HistoriasClinicas/HCHeader';

const Detalle = ({ paciente, historia_clinica }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '35em' } : { height: '53em' }}
          >
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='dna' /> Historia clínica
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <div
              style={
                matches.medium
                  ? { height: '22em', overflow: 'auto' }
                  : { height: '40em', overflow: 'auto' }
              }
            >
              <Table celled striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <b>Antecedentes patológicos</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.antecedente_patologico_personal}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Antecedentes quirúrgicos</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.antecedente_quirurgico}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Alergias</b>
                    </Table.Cell>
                    <Table.Cell>{historia_clinica.alergia}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Abortos</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.aborto.trim() === ''
                        ? 'NO APLICA'
                        : historia_clinica.aborto}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Cesáreas</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.cesarea.trim() === ''
                        ? 'NO APLICA'
                        : historia_clinica.cesarea}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Gestas</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.gesta.trim() === ''
                        ? 'NO APLICA'
                        : historia_clinica.gesta}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Partos</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.parto.trim() === ''
                        ? 'NO APLICA'
                        : historia_clinica.parto}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <b>Método anticonceptivo</b>
                    </Table.Cell>
                    <Table.Cell>
                      {historia_clinica.metodo_anticonceptivo.trim() === ''
                        ? 'NO APLICA'
                        : historia_clinica.metodo_anticonceptivo}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
