import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Detalle from '../../components/HistoriaClinica/Detalle/Detalle';
import Navbar from '../../components/HistoriaClinica/Detalle/NavbarDetalle';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../components/utils';

class HCDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      historiaClinica: {},
      notExistHC: true,
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
      const { data } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (data.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: historiaClinica } = await axios.get(
          `${api_url}/api/historia_paciente/${this.props.match.params.pacienteId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          paciente: data.data,
          historiaClinica: historiaClinica.data,
          loading: false,
        });

        if (this.state.historiaClinica !== null) {
          this.setState({
            notExistHC: false,
          });
        }
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  deleteData = async () => {
    try {
      const { data: HC } = await axios.delete(
        `${api_url}/api/historia_clinica/${this.state.historiaClinica.historia_clinica_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (HC.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        this.props.history.push('/historias_clinicas');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //close modal exists
  closeModal = () => {
    this.setState({
      open: false,
    });
    this.props.history.push(`/historias_clinicas`);
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
            pacienteId={this.props.match.params.pacienteId}
            historiaId={this.state.historiaClinica.historia_clinica_id}
          />
          {!this.state.sesion && (
            <Detalle
              paciente={this.state.paciente}
              historia_clinica={this.state.historiaClinica}
            />
          )}
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="Se eliminarán consigo las evoluciones  
            asociadas a la Historia Clínica.  ¿Desea continuar?"
            headerC="Eliminar Historia Clínica"
          />
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(HCDetalle);
