import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import PerfilC from '../../components/Perfil/Perfil';
import { api_url, mapStateToProps } from '../../components/utils';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuario: {},
      sesion: false,
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

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Layout activeKeyP="0">
          {!this.state.sesion && <PerfilC usuario={this.state.usuario} />}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, null)(Perfil);
