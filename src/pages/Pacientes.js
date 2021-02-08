import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import Navbar from '../components/Pacientes/Navbar';
import Listado from '../components/Pacientes/Listado';
import axios from 'axios';
import { api_url } from '../components/utils/';

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pacientes: {},
      autocomplete: {},
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data } = await axios.get(`${api_url}/api/pacientes`);
      const autoComplete = await axios.get(`${api_url}/api/autocomplete`);

      this.setState({
        pacientes: data.data,
        autocomplete: autoComplete.data,
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
    console.log(this.state.autocomplete);
    return (
      <React.Fragment>
        <Layout>
          <Navbar autoComplete={this.state.autocomplete} />
          <Listado pacientes={Object.values(this.state.pacientes)} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default Pacientes;
