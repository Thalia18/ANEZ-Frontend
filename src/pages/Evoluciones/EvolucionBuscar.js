import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listado from '../../components/Evoluciones/Buscar';
import Layout from '../../components/Layout/Layout';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

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
    if (this.props.user != null && this.props.user.isLoggedIn) {
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
      console.log(this.state.buscarList.data);
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.buscarList);
    return (
      <React.Fragment>
        <Layout activeKeyP='2'>
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
