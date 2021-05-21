import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Listado from '../../components/HistoriasClinicas/Listado';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../components/utils';

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      HC: {},
      autocomplete: {},
      paginas: {},
      page: 1,
      sesion: false,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      (this.props.user.rol.trim().toUpperCase() === 'MÉDICO' ||
        this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR')
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
      const { data } = await axios.get(`${api_url}/api/historias`, {
        method: 'GET',
        headers: {
          Authorization: this.props.jwt.refreshToken,
          auth: this.props.user.rol,
        },
      });
      if (data.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          HC: data.data,
          paginas: data.info,
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
  handleChangePage = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          {!this.state.sesion && (
            <Listado
              header="Historias clínicas"
              icon="heartbeat"
              HC={Object.values(this.state.HC)}
              autoComplete={this.state.autocomplete}
              pageInitial="/historia_clinica"
              pageSecond="/historias_clinicas"
              reload="/historia_clinica_buscar"
              optionNav="HC"
              paginas={this.state.paginas}
              handleChangePage={this.handleChangePage}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Pacientes);
