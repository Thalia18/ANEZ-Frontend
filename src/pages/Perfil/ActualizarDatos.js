import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Actualizar from '../../components/Perfil/Actualizar';
import Navbar from '../../components/Perfil/NavbarAgregar';
import {
  api_url,
  mapStateToProps,
  openNotification,
  regexEmail,
  trimData,
} from '../../components/utils';

class ActualizarDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuario: {},
      sesion: false,
      emailCorrect: false,
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
      const { data } = await axios.get(
        `${api_url}/api/usuario_username/${this.props.match.params.user}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
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
        trimData(data.data);
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

  handleChange = (e) => {
    this.setState({
      usuario: {
        ...this.state.usuario,
        telefono: this.state.usuario.telefono,
        email: this.state.usuario.email,
        [e.target.name]: e.target.value,
      },
    });
  };
  //   usuario_update
  saveData = async () => {
    trimData(this.state.usuario);
    try {
      const result = await axios.patch(
        `${api_url}/api/usuario_update/${this.state.usuario.usuario_id}`,
        this.state.usuario,
        {
          method: 'PATCH',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (result.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        openNotification(
          'success',
          'Perfil',
          'Datos actualizados exitosamente',
          ''
        );
        this.props.history.push(`/perfil/${this.props.match.params.user}`);
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //guardar paciente
  onClickButtonSaveDatos = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    if (!this.state.usuario.email.match(regexEmail)) {
      this.setState({
        loading: false,
      });
      openNotification('error', 'Perfil', 'Correo electrónico no válido', '');
    } else {
      this.setState({
        loading: false,
      });
      this.saveData();
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    console.log(this.state.usuario);
    return (
      <React.Fragment>
        <Layout activeKeyP="0">
          <Navbar usuario={this.state.usuario.usuario} opcion="datos" />

          {!this.state.sesion && (
            <Actualizar
              usuario={this.state.usuario}
              handleChange={this.handleChange}
              onClickButtonSaveDatos={this.onClickButtonSaveDatos}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, null)(ActualizarDatos);
