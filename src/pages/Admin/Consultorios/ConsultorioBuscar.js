import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listado from '../../../components/Admin/Consultorios/Listado';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import { api_url, mapStateToProps } from '../../../components/utils';

class UsuarioBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      consultorios: {},
      paginas: {},
      page: 1,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR'
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
      const { data } = await axios.get(
        `${api_url}/api/consultorios_buscar/${this.props.match.params.buscar}?page=${this.state.page}`
      );

      this.setState({
        consultorios: data.data,
        paginas: data.info,
        loading: false,
      });
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
        <Layout activeKeyP="5">
          <Listado
            header="Resultados de la búsqueda"
            icon="search"
            consultorios={Object.values(this.state.consultorios)}
            paginas={this.state.paginas}
            handleChangePage={this.handleChangePage}
            busqueda={this.props.match.params.buscar}
            buscar={
              Object.values(this.state.consultorios).length > 0 ? false : true
            }
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioBuscar);
