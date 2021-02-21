import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setUser } from '../actions';
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
      this.props.setUser(this.state.userConfirm);
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
};
export default withRouter(connect(null, mapDispatchToProps)(LoginG));
