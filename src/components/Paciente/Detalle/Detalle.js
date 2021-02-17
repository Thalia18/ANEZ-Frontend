import React from 'react';
import Media from 'react-media';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Global } from '../../../global';
import { GLOBAL_MEDIA_QUERIES } from '../../utils';
import { HeaderCell, HeaderSubCell } from './DetalleStyles';

import 'semantic-ui-css/semantic.min.css';

const Detalle = ({ paciente }) => {
  var hoy = new Date();
  var nacimiento = new Date(paciente.fecha_nacimiento);
  const tiempo = hoy.getTime() - nacimiento.getTime();
  const tiempodias = tiempo / 1000 / 60 / 60 / 24;
  const tiempoyear = Math.floor(tiempodias / 365.25);
  const tiempomeses = Math.floor((tiempodias - tiempoyear * 365.25) / 31);
  const dias = Math.floor(tiempodias - tiempoyear * 365.25 - tiempomeses * 31);
  const edad =
    tiempoyear + ' años ' + tiempomeses + ' meses ' + dias + ' días ';

  const styled = { fontWeight: 'bold' };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '30em' } : { height: '50em' }}
          >
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='dna' /> Datos Paciente
              </Header.Content>
            </Header>
            <hr />
            <br />
            <Table fixed celled size={matches.medium ? 'small' : 'large'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='8'>
                    <HeaderCell>
                      <Icon name='user' /> {paciente.nombre} {paciente.apellido}
                    </HeaderCell>
                    <HeaderSubCell>
                      <Icon name='vcard' />
                      {paciente.cedula}
                    </HeaderSubCell>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Lugar de nacimiento
                  </Table.Cell>
                  <Table.Cell colSpan='3'>
                    {paciente.lugar_nacimiento}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Fecha de nacimiento
                  </Table.Cell>
                  <Table.Cell>{paciente.fecha_nacimiento}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Edad
                  </Table.Cell>
                  <Table.Cell>{edad}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Dirección domicilio
                  </Table.Cell>
                  <Table.Cell colSpan='5'>{paciente.direccion}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Teléfono
                  </Table.Cell>
                  <Table.Cell>{paciente.telefono}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Estado civil
                  </Table.Cell>
                  <Table.Cell>{paciente.estadocivil.estado_civil}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Etnia
                  </Table.Cell>
                  <Table.Cell>{paciente.etnias.etnia}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Tipo de sangre
                  </Table.Cell>
                  <Table.Cell>
                    {paciente.tipodesangre.tipo_de_sangre}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Nivel de instrucción
                  </Table.Cell>
                  <Table.Cell>
                    {paciente.niveldeinstruccion.nivel_de_instruccion}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled} colSpan='2'>
                    Nombre contacto de emergencia
                  </Table.Cell>
                  <Table.Cell colSpan='2'>
                    {paciente.contacto_emergencia_nombre}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled} colSpan='2'>
                    Teléfono contacto de emergencia
                  </Table.Cell>
                  <Table.Cell colSpan='2'>
                    {paciente.contacto_emergencia_telefono}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Detalle;
