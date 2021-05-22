import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Image, Segment } from 'semantic-ui-react';
import {
  eliminarTildes,
  fechaFormato,
  fechaFormatoCertificado,
} from '../../utils';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
var writtenNumber = require('written-number');

var fecha = new Date();
var ffecha =
  fecha.getUTCFullYear() + '/' + fecha.getUTCMonth() + '/' + fecha.getDate();
class App extends Component {
  constructor(props) {
    super(props);
  }

  createPdf = (html) => Doc.createPdf(html, this.props.nombreArchivo);
  render() {
    const dias = writtenNumber(this.props.datos.dias_reposo, {
      lang: 'es',
    });
    return (
      <React.Fragment>
        <PdfContainer createPdf={this.createPdf} datos={this.props.datos}>
          <React.Fragment>
            <Container
              style={{
                textAlign: 'center',
                marginTop: '2%',
              }}
            >
              <Image
                src={this.props.consultorio.logo}
                size="tiny"
                style={{ margin: 'auto' }}
              />
              <b style={{ fontSize: '0.8em' }}>
                {eliminarTildes(this.props.consultorio.nombre.toUpperCase())}
              </b>
              <br />

              <p style={{ fontSize: '0.5em' }}>
                {eliminarTildes(this.props.consultorio.direccion)}
                <br />
                Telf: {this.props.consultorio.telefono}
              </p>
              <br />
              <p
                style={{
                  textAlign: 'right',
                  marginRight: '2%',
                  fontSize: '0.7em',
                }}
              >
                Quito, DM, {fechaFormato(ffecha).toLowerCase()}
              </p>
              <br />
            </Container>
            <Container>
              <Segment basic>
                <h5
                  style={{
                    textAlign: 'center',
                  }}
                >
                  CERTIFICADO MEDICO
                </h5>
                <div
                  style={{
                    fontSize: '0.7em',
                    margin: '2em',
                  }}
                >
                  El / la paciente: {this.props.paciente}
                  con Cedula / Pasaporte: {this.props.cedula.trim()} <br /> e
                  Historia Clínica No.:{' '}
                  {this.props.evolucion.historia_clinica_id} fue atendido /a en
                  este centro medico.
                  <br />
                  Diagnostico (s):{' '}
                  {this.props.evolucion.diagnostico_cie10.map((item) => {
                    let value = item.value.split('➜');
                    return (
                      <p key={item.id}>
                        {value[1].trim()} (CIE-10 {value[0].trim()})
                      </p>
                    );
                  })}
                  Fecha de ingreso:{' '}
                  {this.props.datos.fecha_ingreso
                    ? eliminarTildes(
                        fechaFormatoCertificado(this.props.datos.fecha_ingreso)
                      )
                    : ''}
                  <br />
                  Fecha de egreso:{' '}
                  {this.props.datos.fecha_egreso
                    ? eliminarTildes(
                        fechaFormatoCertificado(this.props.datos.fecha_egreso)
                      )
                    : ''}
                  <br />
                  Por lo tanto se ordena: {this.props.datos.dias_reposo} {''}
                  {dias.toUpperCase() ? eliminarTildes(dias.toUpperCase()) : ''}
                  {''} DIA(S) de reposo.
                  <br />A partir del:{' '}
                  {this.props.datos.fecha_inicio
                    ? eliminarTildes(
                        fechaFormatoCertificado(this.props.datos.fecha_inicio)
                      )
                    : ''}
                  <br />
                  hasta el:{' '}
                  {this.props.datos.fecha_fin
                    ? eliminarTildes(
                        fechaFormatoCertificado(this.props.datos.fecha_fin)
                      )
                    : ''}
                  <br />
                  Observaciones:{' '}
                  {this.props.datos.observaciones
                    ? eliminarTildes(
                        this.props.datos.observaciones.toUpperCase()
                      )
                    : ''}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {this.props.user.rol === 'MÉDICO' && (
                    <Container
                      style={{
                        fontSize: '0.9em',
                        borderTop: 'solid black',
                        width: '50%',
                        textAlign: 'center',
                      }}
                    >
                      Firma / Sello del Medico <br />
                      DR(A). {''}
                      {eliminarTildes(this.props.user.nombre)}
                      {''}
                      {eliminarTildes(this.props.user.apellido)}
                    </Container>
                  )}
                </div>
              </Segment>
            </Container>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

export default App;
