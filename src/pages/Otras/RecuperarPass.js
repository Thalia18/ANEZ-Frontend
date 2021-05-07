import axios from 'axios';
import React, { Component } from 'react';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Recuperar from '../../components/RecuperarPass/RecuperarPass';
import { api_url, openNotification } from '../../components/utils/';

class RecuperarPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      correctUser: false,
      user: {
        usuario: '',
      },
    };
  }
  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  //setear los datos para login
  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        usuario: this.state.user.usuario,
        [e.target.name]: e.target.value,
      },
    });
  };

  onClickValidateUser = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: usuario } = await axios.post(
        `${api_url}/api/recuperar_pass`,
        this.state.user
      );
      if (usuario.data) {
        openNotification(
          'success',
          'Recuperar contraseña',
          'Su nueva contraseña se ha enviado al correo ',
          `${usuario.email}. Se recomienda cambiar la contraseña desde su perfil.`
        );
      } else {
        openNotification(
          'error',
          'Recuperar contraseña',
          'No existe un usuario registrado con el nombre de usuario ',
          `${this.state.user.usuario}`
        );
      }
      this.setState({
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
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Recuperar
          formUser={this.state.user}
          handleChange={this.handleChange}
          onClickValidateUser={this.onClickValidateUser}
        />
      </React.Fragment>
    );
  }
}

export default RecuperarPass;
