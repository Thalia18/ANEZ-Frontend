import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Detalle from '../../components/Evolucion/Detalle/Detalle';
import Navbar from '../../components/Evolucion/Detalle/NavbarDetalle';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import { api_url, mapStateToProps } from '../../components/utils';

class PacienteDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      evolucion: {},
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
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );

      this.setState({
        paciente: paciente.data.pacientes,
        evolucion: evolucion.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  deleteData = async () => {
    try {
      await axios.delete(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );
      this.setState({
        loading: false,
      });
      this.props.history.push(
        `/evoluciones/${this.props.match.params.historiaId}`
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  closeModal = () => {
    this.setState({
      open: false,
    });
  };
  onClickDelete = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <Navbar
            onClickDelete={this.onClickDelete}
            historiaId={this.props.match.params.historiaId}
            evolucionId={this.props.match.params.evolucionId}
          />
          <Detalle
            paciente={this.state.paciente}
            evolucion={this.state.evolucion}
          />

          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Evolución"
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteDetalle);
