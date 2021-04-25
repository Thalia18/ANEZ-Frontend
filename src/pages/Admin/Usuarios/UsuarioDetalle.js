import axios from 'axios';
import generator from 'generate-password';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detalle from '../../../components/Admin/Usuarios/Detalle';
import Navbar from '../../../components/Admin/Usuarios/NavbarDetalle';
import Layout from '../../../components/Layout/Layout';
import ModalEliminar from '../../../components/Modales/ModalEliminar';
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
    };
  }
  componentDidMount() {
    if (this.props.user != null && this.props.user.isLoggedIn) {
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
      const { data } = await axios.get(
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`
      );
      this.setState({
        usuario: data.data,
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
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`
      );
      this.setState({
        loading: false,
      });
      this.props.history.push('/admin/usuarios');
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
      await axios.patch(
        `${api_url}/api/usuario_pass/${this.props.match.params.usuarioId}/${this.state.usuario.email}`,
        this.state.usuarioPatch
      );
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
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.usuario);
    return (
      <React.Fragment>
        <Layout activeKeyP="4">
          <Navbar
            onClickDelete={this.onClickDelete}
            usuarioId={this.props.match.params.usuarioId}
            onClickRecuperar={this.recuperarPass}
          />
          <Detalle usuario={this.state.usuario} />
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Usuario"
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioDetalle);
