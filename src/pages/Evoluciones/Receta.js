import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Evolucion/Receta/NavbarReceta';
import RecetaPDF from '../../components/Evolucion/Receta/PDFReceta';
import Layout from '../../components/Layout/Layout';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

import 'semantic-ui-css/semantic.min.css';

class Receta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      evolucion: {},
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
      const { data: evolucion } = await axios.get(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );
      this.setState({
        evolucion: evolucion.data,
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
          <RecetaPDF
            consultorio={this.props.consultorio}
            evolucion={this.state.evolucion}
            nombreMedico={this.props.user.nombre.trim()}
            apellidoMedico={this.props.user.apellido.trim()}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Receta);
