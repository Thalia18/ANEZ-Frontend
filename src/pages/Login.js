import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setConsultorio, setEspecialidad, setUser } from '../actions';
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
      especialidad: {},
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
      // loading: true,
      error: null,
    });
    try {
      const { data: usuario } = await axios.get(
        `${api_url}/api/confirm_user/${this.state.user.usuario}/${this.state.user.contrasena}`
      );
      this.setState({
        userConfirm: usuario.data,
        loading: false,
        correctUser: false,
      });
      const { data: consultorio } = await axios.get(
        `${api_url}/api/consultorio/${this.state.userConfirm.consultorio_id}`
      );
      const { data: especialidad } = await axios.get(
        `${api_url}/api/especialidad_medico/${this.state.userConfirm.medico_id}`
      );
      this.setState({
        consultorio: consultorio.data,
        especialidad: especialidad.data,
      });
      this.props.setUser(this.state.userConfirm);
      this.props.setConsultorio(this.state.consultorio);
      this.props.setEspecialidad(this.state.especialidad);
      this.props.history.push('/main');
    } catch (error) {
      this.setState({
        loading: false,
        // error: error,
        correctUser: true,
      });
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
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
  setEspecialidad,
};
export default withRouter(connect(null, mapDispatchToProps)(LoginG));
