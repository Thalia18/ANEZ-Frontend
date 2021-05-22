import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detalle from '../../../components/Admin/Medicos/Detalle';
import Navbar from '../../../components/Admin/Medicos/NavbarDetalle';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import ModalEliminar from '../../../components/Modales/ModalEliminar';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import {
  api_url,
  mapStateToProps,
  openNotification,
} from '../../../components/utils';

class UsuarioDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      medico: {},

      sesion: false,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR'
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
        `${api_url}/api/medico/${this.props.match.params.medicoId}`,
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
        this.setState({
          medico: data.data,
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
      const { data: usuario } = await axios.delete(
        `${api_url}/api/usuario/${this.state.medico.usuario_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (usuario.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        openNotification(
          'success',
          'Médicos',
          `Médico eliminado exitosamente`,
          ''
        );
        this.props.history.push('/admin/medicos');
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
        <Layout activeKeyP="5">
          <Navbar
            onClickDelete={this.onClickDelete}
            regresar="/admin/medicos"
            medicoId={this.state.medico.medico_id}
          />
          {!this.state.sesion && <Detalle medico={this.state.medico} />}
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Médico"
          />
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioDetalle);
