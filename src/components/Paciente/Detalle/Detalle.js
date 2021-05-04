import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Global } from '../../../global';
import {
  calculaEdad,
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  mediumHeight,
} from '../../utils';
import { HeaderCell, HeaderSubCell } from './DetalleStyles';

const Detalle = ({ paciente }) => {
  const edad = calculaEdad(paciente.fecha_nacimiento);
  const styled = { fontWeight: 'bold' };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name="dna" /> Datos Paciente
              </Header.Content>
            </Header>
            <hr />
            <br />
            <Table
              fixed={matches.medium ? true : null}
              celled
              size={matches.medium ? 'small' : 'large'}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                    <HeaderCell>
                      <Icon name="user" /> {paciente.nombre} {paciente.apellido}
                    </HeaderCell>
                    <HeaderSubCell>
                      <Icon name="vcard" />
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
                  <Table.Cell colSpan="3">
                    {paciente.lugar_nacimiento}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Fecha de nacimiento
                  </Table.Cell>
                  <Table.Cell colSpan="3">
                    {fechaFormato(paciente.fecha_nacimiento)}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Edad
                  </Table.Cell>
                  <Table.Cell colSpan="3">{edad}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Género
                  </Table.Cell>
                  <Table.Cell colSpan="3">{paciente.generos.genero}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Estado civil
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    {paciente.estadocivil.estado_civil.toUpperCase()}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Etnia
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    {paciente.etnias.etnia.toUpperCase()}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Tipo de sangre
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    {paciente.tipodesangre.tipo_de_sangre}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Nivel de instrucción
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    {paciente.niveldeinstruccion.nivel_de_instruccion.toUpperCase()}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Dirección domicilio
                  </Table.Cell>
                  <Table.Cell colSpan="6">{paciente.direccion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Correo electrónico
                  </Table.Cell>
                  <Table.Cell colSpan="4">{paciente.email}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Teléfono
                  </Table.Cell>
                  <Table.Cell colSpan="2">{paciente.telefono}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Nombre contacto de emergencia
                  </Table.Cell>
                  <Table.Cell colSpan="2">
                    {paciente.contacto_emergencia_nombre}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled} colSpan="2">
                    Teléfono contacto de emergencia
                  </Table.Cell>
                  <Table.Cell colSpan="2">
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
