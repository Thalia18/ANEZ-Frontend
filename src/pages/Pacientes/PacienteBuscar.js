import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Listado from '../../components/Pacientes/Listado';
import { api_url, mapStateToProps } from '../../components/utils';

class PacientesBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pacientes: {},
      paginas: {},
      sesion: false,
      page: 1,
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
        `${api_url}/api/pacientes_buscar/${this.props.match.params.buscar}?page=${this.state.page}`,
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
        this.setState({
          pacientes: data.data,
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
        <Layout activeKeyP="3">
          {!this.state.sesion && (
            <Listado
              header="Resultado de la búsqueda"
              icon="search"
              pacientes={Object.values(this.state.pacientes)}
              pageInitial="/paciente"
              pageSecond="/pacientes"
              reload="/paciente_buscar"
              optionNav="PC"
              buscar={
                Object.values(this.state.pacientes).length > 0 ? false : true
              }
              busqueda={this.props.match.params.buscar}
              paginas={this.state.paginas}
              handleChangePage={this.handleChangePage}
              user={this.props.user}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacientesBuscar);
