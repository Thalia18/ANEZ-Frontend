import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import { eliminarTildes, fechaFormato } from '../../utils';
import Content from './Content';
import Doc from './DocService';
import Footer from './Footer';
import Header from './Header';
import PdfContainer from './PdfContainer';

import 'semantic-ui-css/semantic.min.css';

const Datos = ({ paciente, fecha }) => {
  return (
    <React.Fragment>
      <p align='center'>{fechaFormato(fecha)}</p>
      <p>
        <b>PACIENTE:</b>
        {paciente.substring(22, paciente.length)}
      </p>
      <br />
    </React.Fragment>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  createPdf = (html) => Doc.createPdf(html, this.props.paciente);

  render() {
    return (
      <React.Fragment>
        <PdfContainer createPdf={this.createPdf}>
          <React.Fragment>
            <Grid
              style={{
                fontFamily: 'Bookman, URW Bookman L, serif',
                fontSize: '0.7em',
                margin: '0em 2em',
              }}
            >
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <Datos
                    paciente={this.props.paciente}
                    fecha={this.props.evolucion.fecha}
                  />
                  <b>MEDICACION:</b>
                  <br />
                  <Content texto={this.props.evolucion.medicacion} />

                  <Footer
                    telefono={this.props.consultorio.telefono}
                    direccion={eliminarTildes(this.props.consultorio.direccion)}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Datos
                    paciente={this.props.paciente}
                    fecha={this.props.evolucion.fecha}
                  />
                  <b>INDICACIONES:</b>
                  <br />
                  <Content texto={this.props.evolucion.indicacion} />

                  <Footer
                    telefono={this.props.consultorio.telefono}
                    direccion={eliminarTildes(this.props.consultorio.direccion)}
                  />
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
