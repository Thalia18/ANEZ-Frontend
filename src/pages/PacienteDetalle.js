import axios from 'axios';
import React, { Component } from 'react';

import Layout from '../components/Layout/Layout';
import Detalle from '../components/Paciente/Detalle';
import Navbar from '../components/Paciente/Navbar';
import { api_url } from '../components/utils';

class PacienteDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      paciente: {},
      a: true,
    };
  }
  componentDidMount() {
    if (this.state.a) {
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
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );
      this.setState({
        paciente: data.data,
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
        <Layout>
          <Navbar />
          <Detalle paciente={this.state.paciente} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default PacienteDetalle;
