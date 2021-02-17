import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Buscar from '../../components/Pacientes/Buscar';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pacientes: {},
      autocomplete: {},
      buscar: '',
    };
  }
  componentDidMount() {
    if (this.props.user.isLoggedIn) {
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
        `${api_url}/api/cedula_paciente/${this.props.match.params.cedula}`
      );
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
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.pacientes);
    return (
      <React.Fragment>
        <Layout activeKeyP='3'>
          <Buscar
            paciente={this.state.pacientes}
            autoComplete={this.state.autocomplete}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Pacientes);
