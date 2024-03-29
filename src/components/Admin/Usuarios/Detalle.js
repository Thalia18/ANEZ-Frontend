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
  calculaEdad,
  fechaFormato,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils/index';

const Detalle = ({ usuario, medico, medShow }) => {
  const edad = calculaEdad(usuario.fecha_nacimiento);

  const styled = { fontWeight: 'bold' };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="dna" /> Datos Usuario
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
                      <Icon name="user" /> {usuario.nombre} {usuario.apellido}
                      <br />
                      <br />
                      <Icon name="user circle" /> {usuario.usuario}
                    </HeaderCell>

                    <HeaderSubCell>
                      <Icon name="vcard" />
                      {usuario.cedula}
                    </HeaderSubCell>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Fecha de nacimiento
                  </Table.Cell>
                  <Table.Cell colSpan="4">
                    {fechaFormato(usuario.fecha_nacimiento)}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Edad
                  </Table.Cell>
                  <Table.Cell colSpan="2">{edad}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Correo electrónico
                  </Table.Cell>
                  <Table.Cell colSpan="4">{usuario.email}</Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Teléfono
                  </Table.Cell>
                  <Table.Cell colSpan="2">{usuario.telefono}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell collapsing style={styled}>
                    Consultorio
                  </Table.Cell>
                  <Table.Cell colSpan="4">
                    {usuario.consultorios.nombre}
                  </Table.Cell>
                  <Table.Cell collapsing style={styled}>
                    Rol
                  </Table.Cell>
                  <Table.Cell colSpan="2">{usuario.rol.rol}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  {medShow && (
                    <>
                      <Table.Cell collapsing style={styled}>
                        Especialidades
                      </Table.Cell>
                      <Table.Cell colSpan="8">
                        {medico.especialidad.map((item) => {
                          return <p key={item.id}>{item.value}</p>;
                        })}
                      </Table.Cell>
                    </>
                  )}
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
