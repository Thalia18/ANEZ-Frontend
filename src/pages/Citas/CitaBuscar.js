import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buscar from '../../components/Citas/Buscar';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExperida';
import { api_url, mapStateToProps } from '../../components/utils';

class CitasBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      citas: {},
      citaList: [],
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
      const { data: citas } = await axios.get(
        `${api_url}/api/citas_fecha/${this.props.match.params.fecha1}/${this.props.match.params.fecha2}?page=${this.state.page}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (citas.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          citas: citas.data,
          paginas: citas.info,
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
        <Layout activeKeyP="1">
          {!this.state.sesion && (
            <Buscar
              citas={this.state.citas}
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

export default connect(mapStateToProps, null)(CitasBuscar);
