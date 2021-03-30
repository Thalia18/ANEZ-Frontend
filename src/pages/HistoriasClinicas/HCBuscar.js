import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Listado from '../../components/Pacientes/Listado';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class HCBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pacientes: {},
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
        `${api_url}/api/pacientes_buscar/${this.props.match.params.buscar}`
      );

      this.setState({
        pacientes: data.data,
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
            header='Resultado de la búsqueda'
            icon='search'
            pacientes={Object.values(this.state.pacientes)}
            pageInitial='/historia_clinica'
            pageSecond='/historias_clinicas'
            reload='/historia_clinica_buscar'
            optionNav='HC'
            buscar={
              Object.values(this.state.pacientes).length > 0 ? false : true
            }
            busqueda={this.props.match.params.buscar}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(HCBuscar);
