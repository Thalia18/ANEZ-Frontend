import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detalle from '../../components/Cita/Detalle/Detalle';
import Navbar from '../../components/Cita/Detalle/NavbarDetalle';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import { api_url, fechaCitas, mapStateToProps } from '../../components/utils';

class CitaDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      cita: {},
      medico: {},
      sesion: false,
    };
  }
  componentDidMount() {
    if (this.props.user != null && this.props.user.isLoggedIn) {
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
      const { data: cita } = await axios.get(
        `${api_url}/api/cita/${this.props.match.params.citaId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (cita.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: medico } = await axios.get(
          `${api_url}/api/medicos_usuario/${cita.data.medico_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          cita: cita.data,
          medico: medico.data[0],
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

  deleteData = async () => {
    try {
      const { data: cita } = await axios.delete(
        `${api_url}/api/cita/${this.props.match.params.citaId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (cita.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        this.props.history.push(`/citas/${fechaCitas(new Date())}/month`);
      }
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
        <Layout activeKeyP="1">
          <Navbar
            onClickDelete={this.onClickDelete}
            pacienteId={this.state.cita.paciente_id}
            citaId={this.props.match.params.citaId}
          />
          {!this.state.sesion && (
            <Detalle cita={this.state.cita} medico={this.state.medico} />
          )}
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Cita"
          />
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitaDetalle);
