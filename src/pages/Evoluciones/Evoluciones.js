import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listado from '../../components/Evoluciones/Listado';
import Layout from '../../components/Layout/Layout';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class Evoluciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      evoluciones: {},
      autocomplete: {},
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
      const { data } = await axios.get(
        `${api_url}/api/evoluciones_historia/${this.props.match.params.historiaId}`
      );
      const autoComplete = await axios.get(
        `${api_url}/api/evoluciones_autocomplete/${this.props.match.params.historiaId}`
      );
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );
      this.setState({
        evoluciones: data.data,
        autocomplete: autoComplete.data,
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
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='2'>
          <Listado
            evoluciones={Object.values(this.state.evoluciones)}
            autoComplete={this.state.autocomplete}
            paciente={this.state.paciente}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Evoluciones);
