import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Detalle from '../../components/Cita/Detalle/Detalle';
import Navbar from '../../components/Evolucion/Detalle/NavbarDetalle';
import Layout from '../../components/Layout/Layout';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import { api_url } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class PacienteDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      cita: {},
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
      const { data: cita } = await axios.get(
        `${api_url}/api/cita/${this.props.match.params.citaId}`
      );

      this.setState({
        cita: cita.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  deleteData = async () => {
    try {
      await axios.delete(
        `${api_url}/api/cita/${this.props.match.params.citaId}`
      );
      this.setState({
        loading: false,
      });
      this.props.history.push(`/citas`);
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  closeModal = () => {
    this.setState({
      open: false,
    });
  };
  onClickDelete = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='1'>
          <Navbar onClickDelete={this.onClickDelete} />
          <Detalle cita={this.state.cita} />

          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content='¿Desea continuar?'
            headerC='Eliminar Cita'
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteDetalle);
