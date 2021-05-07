import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import Error from '../../components/Error/Error';
import RecetaPDF from '../../components/Evolucion/Receta/PDFReceta';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../components/utils';

class Receta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      evolucion: {},
      paciente: {},
      sesion: false,
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
      this.props.history.push('/error_auth');
    }
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: evolucion } = await axios.get(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (evolucion.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: paciente } = await axios.get(
          `${api_url}/api/paciente_historia/${evolucion.data.historia_clinica_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          evolucion: evolucion.data,
          paciente: paciente.data,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          {!this.state.sesion && (
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
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Receta);
