import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../../components/Admin/Consultorios/Agregar';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader';
import Navbar from '../../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../../components/utils';

class UsuarioAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      foto: '',
      consultorio: {
        nombre: '',
        ruc: '',
        direccion: '',
        telefono: '',
        logo: '',
      },
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
      loading: false,
      error: null,
    });
  };
  //setear los datos del formulario de evolucion
  handleChange = (e) => {
    this.setState({
      consultorio: {
        ...this.state.consultorio,
        nombre: this.state.consultorio.nombre,
        ruc: this.state.consultorio.ruc,
        direccion: this.state.consultorio.direccion,
        telefono: this.state.consultorio.telefono,
        logo: this.state.consultorio.logo,
        [e.target.name]: e.target.value,
      },
    });
  };

  //guardar cita
  onClickButtonSaveUsuario = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    this.state.foto = this.state.consultorio.logo;
    trimData(this.state.consultorio);
    this.state.consultorio.logo = this.state.foto;
    try {
      const { data: consultorio } = await axios.post(
        `${api_url}/api/consultorio`,
        this.state.consultorio
      );

      this.setState({
        loading: false,
        success: true,
        error: null,
      });
      if (consultorio.info.exist) {
        openNotification(
          'warning',
          'Consultorios',
          'Ya existe un consultorio registrado con el nombre ',
          `${this.state.consultorio.nombre}`
        );
      } else {
        openNotification(
          'success',
          'Consultorio',
          'Consultorio creado exitosamente',
          ''
        );
        this.props.history.push('/admin/consultorios');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;

    if (this.state.error) return <div>error</div>;
    console.log(this.state.consultorio);
    return (
      <React.Fragment>
        <Layout activeKeyP="5">
          <Navbar buttonDisable={this.state.buttonDisable} />

          <Agregar
            id="formAgregar"
            onClickButtonSaveUsuario={this.onClickButtonSaveUsuario}
            formConsultorio={this.state.consultorio}
            handleChange={this.handleChange}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioAgregar);
