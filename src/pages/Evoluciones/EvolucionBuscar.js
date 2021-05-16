import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Listado from '../../components/Evoluciones/Buscar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../components/utils';

class Evoluciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      buscarList: {},
      paciente: {},
      sesion: false,
      paginas: {},
      page: 1,
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
      const { data: buscarList } = await axios.get(
        `${api_url}/api/evoluciones_fecha/${this.props.match.params.historiaId}/${this.props.match.params.fecha1}/${this.props.match.params.fecha2}?page=${this.state.page}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (buscarList.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: paciente } = await axios.get(
          `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          buscarList: buscarList.data,
          paciente: paciente.data.pacientes,
          paginas: buscarList.info,
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
              evoluciones={Object.values(this.state.buscarList)}
              paciente={this.state.paciente}
              fecha1={this.props.match.params.fecha1}
              fecha2={this.props.match.params.fecha2}
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

export default connect(mapStateToProps, null)(Evoluciones);
