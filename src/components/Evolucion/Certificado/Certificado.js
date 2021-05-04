import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Image, Segment } from 'semantic-ui-react';
import { eliminarTildes, fechaFormato } from '../../utils';
import Doc from './DocService';
import PdfContainer from './PdfContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  createPdf = (html) => Doc.createPdf(html, this.props.nombreArchivo);

  render() {
    return (
      <React.Fragment>
        <PdfContainer createPdf={this.createPdf}>
          <React.Fragment>
            <Container
              style={{
                textAlign: 'center',
                marginTop: '2%',
              }}
            >
              <Image
                src={this.props.consultorio.logo}
                size="small"
                style={{ margin: 'auto' }}
              />
              <b>
                {eliminarTildes(this.props.consultorio.nombre.toUpperCase())}
              </b>
              <br />
              <br />

              <p style={{ fontSize: '0.7em' }}>
                {eliminarTildes(this.props.consultorio.direccion)}
                <br />
                Telf: {this.props.consultorio.telefono}
              </p>
              <br />
              <p
                style={{
                  textAlign: 'right',
                  marginRight: '2%',
                  fontSize: '0.8em',
                }}
              >
                Quito, DM,{' '}
                {fechaFormato(this.props.evolucion.fecha).toLowerCase()}
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
                    fontSize: '0.8em',
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
                        {value[1]} (CIE-10 {value[0]})
                      </p>
                    );
                  })}
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
