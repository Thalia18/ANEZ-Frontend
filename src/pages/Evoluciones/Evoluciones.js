import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listado from '../../components/Evoluciones/Listado';
import Layout from '../../components/Layout/Layout';
import { api_url, mapStateToProps } from '../../components/utils';

class Evoluciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      evoluciones: {},
      paciente: {},
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
      this.props.history.push('/');
    }
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data } = await axios.get(
        `${api_url}/api/evoluciones_historia/${this.props.match.params.historiaId}?page=${this.state.page}`
      );

      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );
      this.setState({
        evoluciones: data.data,
        paciente: paciente.data.pacientes,
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
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <Listado
            evoluciones={Object.values(this.state.evoluciones)}
            paciente={this.state.paciente}
            paginas={this.state.paginas}
            handleChangePage={this.handleChangePage}
            historiaId={this.props.match.params.historiaId}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Evoluciones);
