import axios from 'axios';
import generator from 'generate-password';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detalle from '../../../components/Admin/Usuarios/Detalle';
import Navbar from '../../../components/Admin/Usuarios/NavbarDetalle';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import ModalEliminar from '../../../components/Modales/ModalEliminar';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import {
  api_url,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../../components/utils';

class UsuarioDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      usuario: {},
      usuarioPatch: {
        contrasena: generator
          .generate({
            length: 6,
            numbers: true,
          })
          .toUpperCase(),
      },
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
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`,
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
          usuario: data.data,
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
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`,
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
          'Usuarios',
          `Usuario eliminado exitosamente`,
          ''
        );
        this.props.history.push('/admin/usuarios');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  recuperarPass = async () => {
    trimData(this.state.usuarioPatch);

    try {
      const { data: usuario } = await axios.patch(
        `${api_url}/api/usuario_pass/${this.props.match.params.usuarioId}/${this.state.usuario.email}`,
        this.state.usuarioPatch,
        {
          method: 'PATCH',
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
          'info',
          'Usuario',
          `La nueva contraseña se ha enviado al correo electrónico ${this.state.usuario.email}`,
          ''
        );
        this.props.history.push(`/admin/usuarios`);
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
        <Layout activeKeyP="4">
          <Navbar
            onClickDelete={this.onClickDelete}
            usuarioId={this.props.match.params.usuarioId}
            onClickRecuperar={this.recuperarPass}
            tipo="usuario"
            regresar="/admin/usuarios"
          />
          {!this.state.sesion && <Detalle usuario={this.state.usuario} />}
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Usuario"
          />
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioDetalle);
