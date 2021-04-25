import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import RecetaPDF from '../../components/Evolucion/Receta/PDFReceta';
import Layout from '../../components/Layout/Layout';
import { api_url, mapStateToProps } from '../../components/utils';

class Receta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      evolucion: {},
      paciente: {},
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      (this.props.user.rol.trim().toUpperCase() === 'MÉDICO' ||
        this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR')
    ) {
      this.fetchData();
    } else {
      this.props.history.push('/');
    }
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: evolucion } = await axios.get(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${evolucion.data.historia_clinica_id}`
      );
      this.setState({
        evolucion: evolucion.data,
        paciente: paciente.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <RecetaPDF
            consultorio={this.props.consultorio}
            evolucion={this.state.evolucion}
            nombreMedico={this.props.user.nombre.trim()}
            apellidoMedico={this.props.user.apellido.trim()}
            paciente={
              `Receta ANEZ ${this.state.evolucion.fecha} ` +
              this.state.paciente.pacientes.nombre +
              ' ' +
              this.state.paciente.pacientes.apellido
            }
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Receta);
