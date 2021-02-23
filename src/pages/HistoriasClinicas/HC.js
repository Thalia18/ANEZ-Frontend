import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listado from '../../components/HistoriasClinicas/HC';
import Layout from '../../components/Layout/Layout';
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
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='2'>
          <Listado
            pacientes={Object.values(this.state.pacientes)}
            autoComplete={this.state.autocomplete}
            pageInitial='/historia_clinica'
            pageSecond='/historias_clinicas'
            reload='/historia_clinica_buscar'
            optionNav='HC'
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Pacientes);
