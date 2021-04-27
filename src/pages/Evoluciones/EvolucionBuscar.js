import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listado from '../../components/Evoluciones/Buscar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader';
import { api_url, mapStateToProps } from '../../components/utils';

class Evoluciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      buscarList: {},
      paciente: {},
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
      const { data: buscarList } = await axios.get(
        `${api_url}/api/evoluciones_fecha/${this.props.match.params.historiaId}/${this.props.match.params.fecha1}/${this.props.match.params.fecha2}`
      );
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );
      this.setState({
        buscarList: buscarList.data,
        paciente: paciente.data.pacientes,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <Listado
            evoluciones={Object.values(this.state.buscarList)}
            paciente={this.state.paciente}
            fecha1={this.props.match.params.fecha1}
            fecha2={this.props.match.params.fecha2}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Evoluciones);
