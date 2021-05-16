import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCategorias, setConsultorio, setJWT, setUser } from '../../actions';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import Login from '../../components/Login/Login';
import { api_url } from '../../components/utils/';

class LoginG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      correctUser: false,
      user: {
        usuario: '',
        contrasena: '',
      },
      userConfirm: {},
      consultorio: {},
      categorias: {},
      jwt: { refreshToken: '' },
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
        contrasena: this.state.user.contrasena,
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
        `${api_url}/api/confirm_user`,
        this.state.user
      );
      this.setState({
        correctUser: false,
        userConfirm: usuario.data,
      });
      if (usuario.error) {
        this.setState({
          loading: false,
          correctUser: true,
        });
      }

      if (this.state.userConfirm) {
        this.setState({
          loading: true,
        });
        const { data: refresh } = await axios.post(
          `${api_url}/api/refresh_token`,
          {
            method: 'POST',
            headers: {
              Authorization: usuario.accessToken,
              auth: usuario.data.rol.trim(),
            },
          }
        );
        const { data: consultorio } = await axios.get(
          `${api_url}/api/consultorio/${this.state.userConfirm.consultorio_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: refresh.refreshToken,
              auth: usuario.data.rol.trim(),
            },
          }
        );
        this.setState({
          consultorio: consultorio.data,
          jwt: { refreshToken: refresh.refreshToken },
        });
        this.props.setJWT(this.state.jwt);
        this.props.setConsultorio(this.state.consultorio);
        this.props.setUser(this.state.userConfirm);
        this.setState({
          loading: false,
        });
        this.props.history.push('/main');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
        // correctUser: true,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Login
          correctUser={this.state.correctUser}
          validateUser={this.onClickValidateUser}
          formUser={this.state.user}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  setUser,
  setConsultorio,
  setJWT,
  setCategorias,
};
export default withRouter(connect(null, mapDispatchToProps)(LoginG));
