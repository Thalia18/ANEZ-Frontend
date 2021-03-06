import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import Doc from './DocService';
import Footer from './Footer';
import Header from './Header';
import PdfContainer from './PdfContainer';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  createPdf = (html) => Doc.createPdf(html);

  eliminarTildes = (texto) => {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  };

  render() {
    return (
      <React.Fragment>
        <PdfContainer createPdf={this.createPdf}>
          <React.Fragment>
            <Grid
              style={{
                fontFamily: 'Bookman, URW Bookman L, serif',
                fontSize: '0.9em',
                margin: '0em 2em',
              }}
            >
              {/* <Grid.Row>
                <Grid.Column width={8}>
                  <Header
                    logo={this.props.consultorio.logo}
                    nombre={this.eliminarTildes(this.props.consultorio.nombre)}
                    nombreMedico={this.eliminarTildes(this.props.nombreMedico)}
                    apellidoMedico={this.eliminarTildes(
                      this.props.apellidoMedico
                    )}
                    especialidad={this.eliminarTildes(
                      this.props.especialidad[0].especialidades.especialidad
                    )}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header
                    logo={this.props.consultorio.logo}
                    nombre={this.eliminarTildes(this.props.consultorio.nombre)}
                    nombreMedico={this.eliminarTildes(this.props.nombreMedico)}
                    apellidoMedico={this.eliminarTildes(
                      this.props.apellidoMedico
                    )}
                    especialidad={this.eliminarTildes(
                      this.props.especialidad[0].especialidades.especialidad
                    )}
                  />
                </Grid.Column>
              </Grid.Row> */}

              <Grid.Row>
                <Grid.Column width={8}>
                  <b>MEDICACION:</b>
                  <br />
                  <Container
                    style={{ height: '25em', overflow: 'auto', margin: '1em' }}
                  >
                    {this.props.evolucion.medicacion !== undefined
                      ? this.eliminarTildes(this.props.evolucion.medicacion)
                      : this.props.evolucion.medicacion}
                  </Container>
                  {/* <Footer
                    telefono={this.props.consultorio.telefono}
                    direccion={this.eliminarTildes(
                      this.props.consultorio.direccion
                    )}
                  /> */}
                </Grid.Column>
                <Grid.Column width={8}>
                  <b>INDICACIONES:</b>
                  <br />
                  <Container
                    style={{ height: '25em', overflow: 'auto', margin: '1em' }}
                  >
                    {this.props.evolucion.indicacion !== undefined
                      ? this.eliminarTildes(this.props.evolucion.indicacion)
                      : this.props.evolucion.indicacion}
                  </Container>
                  {/* <Footer
                    telefono={this.props.consultorio.telefono}
                    direccion={this.eliminarTildes(
                      this.props.consultorio.direccion
                    )}
                  /> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

export default App;
