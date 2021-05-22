import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listado from '../../../components/Admin/Medicos/Listado';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../../components/utils';

class UsuarioBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      medicos: {},
      paginas: {},
      page: 1,
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
        `${api_url}/api/medicos_buscar/${this.props.match.params.buscar}?page=${this.state.page}`,
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
          medicos: data.data,
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
        <Layout activeKeyP="4">
          {!this.state.sesion && (
            <Listado
              header="Resultados de la búsqueda"
              icon="search"
              medicos={Object.values(this.state.medicos)}
              paginas={this.state.paginas}
              handleChangePage={this.handleChangePage}
              user={this.props.user}
              busqueda={this.props.match.params.buscar}
              buscar={
                Object.values(this.state.medicos).length > 0 ? false : true
              }
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioBuscar);
