import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCategorias, setConsultorio, setJWT, setUser } from '../actions';
import Error from '../components/Error/Error';
import Loader from '../components/Loader/Loader';
import Login from '../components/Login/Login';
import { api_url } from '../components/utils/';

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
      jwt: { accessToken: '' },
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
        jwt: { accessToken: usuario.accessToken },
      });

      if (this.state.userConfirm) {
        this.setState({
          loading: true,
        });
        const { data: consultorio } = await axios.get(
          `${api_url}/api/consultorio/${this.state.userConfirm.consultorio_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: usuario.accessToken,
              auth: usuario.data.rol.trim(),
            },
          }
        );

        if (this.state.userConfirm.rol.trim() === 'MÉDICO') {
          const { data: cie10List } = await axios.get(
            `${api_url}/api/categorias`,
            {
              method: 'GET',
              headers: {
                Authorization: usuario.accessToken,
                auth: usuario.data.rol.trim(),
              },
            }
          );
          this.setState({
            categorias: cie10List.data,
          });
        }
        this.setState({
          consultorio: consultorio.data,
        });
        this.props.setJWT(this.state.jwt);
        this.props.setCategorias(this.state.categorias);
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
        // error: error,
        correctUser: true,
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
