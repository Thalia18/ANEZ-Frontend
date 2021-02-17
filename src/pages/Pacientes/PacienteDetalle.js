import axios from 'axios';
import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Detalle from '../../components/Paciente/Detalle/Detalle';
import Navbar from '../../components/Paciente/Detalle/NavbarDetalle';
import { api_url } from '../../components/utils';
import ModalEliminar from '../../components/Modales/ModalEliminar';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../components/utils';

class PacienteDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
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
  deleteData = async () => {
    try {
      await axios.delete(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );
      this.setState({
        loading: false,
      });
      this.props.history.push('/pacientes');
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
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='3'>
          <Navbar
            onClickDelete={this.onClickDelete}
            pacienteId={this.props.match.params.pacienteId}
          />
          <Detalle paciente={this.state.paciente} goBack={this.goBack} />
          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteDetalle);
