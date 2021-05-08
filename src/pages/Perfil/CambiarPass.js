import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Pass from '../../components/Perfil/CambiarPass';
import Navbar from '../../components/Perfil/NavbarAgregar';
import {
  api_url,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../components/utils';

class ActualizarDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuario: {
        passActual: '',
        passNew: '',
        passNewConfirm: '',
      },
      user: {},
      userF: {},
      sesion: false,
      emailCorrect: false,
      score: '',
      percent: 0,
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
          user: data.data,
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

  handleChange = (e, equal) => {
    this.setState({
      usuario: {
        ...this.state.usuario,
        passActual: this.state.usuario.passActual,
        passNew: this.state.usuario.passNew,
        passNewConfirm: this.state.usuario.passNewConfirm,
        [e.target.name]: e.target.value,
      },
    });
    this.checkSecurity(this.state.usuario.passNew);
  };

  //   usuario_update
  saveData = async () => {
    this.setState({
      userF: {
        contrasena: this.state.usuario.passNew.trim(),
      },
    });
    // trimData(this.state.userF);
    try {
      const result = await axios.patch(
        `${api_url}/api/usuario_update_pass/${this.state.user.usuario_id}/${this.state.usuario.passActual}`,
        this.state.userF,
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
      } else if (result.data.pass) {
        this.setState({
          loading: false,
          error: null,
        });
        openNotification('error', 'Perfil', 'Contraseña actual incorrecta', '');
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        openNotification(
          'success',
          'Perfil',
          'Contraseña cambiada exitosamente',
          ''
        );
        setTimeout(() => {
          this.props.history.push('/');

          this.props.logoutUser([]);
        }, 2000);
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
    // e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    if (this.state.percent < 75) {
      this.setState({
        loading: false,
      });
      openNotification(
        'error',
        'Perfil',
        'La nueva contraseña no cumple con los requisitos especificados. ',
        ''
      );
    } else if (
      this.state.usuario.passNew !== this.state.usuario.passNewConfirm
    ) {
      this.setState({
        loading: false,
      });
      openNotification('error', 'Perfil', 'Las contraseñas no coinciden. ', '');
    } else {
      this.setState({
        loading: false,
      });
      this.saveData();
    }
  };

  checkSecurity = (password) => {
    if (password.length >= 5) {
      var percent = 0;
      if (password.match(/[0-9]+/)) {
        percent += 25;
      }
      if (password.match(/[A-Z]+/)) {
        percent += 25;
      }
      if (password.match(/[a-z]+/)) {
        percent += 25;
      }
      if (password.match(/[$@#&!*]+/)) {
        percent += 25;
      }
      this.setState({
        percent: percent,
      });
    } else {
      this.setState({
        percent: 0,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    console.log(this.state.usuario);

    return (
      <React.Fragment>
        <Layout activeKeyP="0">
          <Navbar usuario={this.state.user.usuario} opcion="pass" />
          {!this.state.sesion && (
            <Pass
              usuario={this.state.usuario}
              handleChange={this.handleChange}
              onClickButtonSaveDatos={this.onClickButtonSaveDatos}
              percent={this.state.percent}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ActualizarDatos);
