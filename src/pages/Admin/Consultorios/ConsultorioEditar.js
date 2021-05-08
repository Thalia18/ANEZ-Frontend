import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../../components/Admin/Consultorios/Agregar';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import Navbar from '../../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  mapStateToProps,
  onlyTrimData,
  openNotification,
  trimData,
} from '../../../components/utils';

class ConsultorioEditar extends Component {
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
        updatedAt: new Date(),
      },
      sesion: false,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR'
    ) {
      this.fetchData();
    } else {
      this.props.history.push('/error_auth');
    }
  }
  fetchData = async () => {
    this.setState({
      loading: false,
      error: null,
    });
    try {
      const { data: consultorio } = await axios.get(
        `${api_url}/api/consultorio/${this.props.match.params.consultorioId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (consultorio.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        onlyTrimData(consultorio.data);
        this.setState({
          consultorio: consultorio.data,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
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
      const { data: consultorio } = await axios.put(
        `${api_url}/api/consultorio/${this.props.match.params.consultorioId}`,
        this.state.consultorio,
        {
          method: 'PUT',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (consultorio.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        if (consultorio.data.exist) {
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
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="5">
          <Navbar />

          {!this.state.sesion && (
            <Agregar
              id="formAgregar"
              onClickButtonSaveUsuario={this.onClickButtonSaveUsuario}
              formConsultorio={this.state.consultorio}
              handleChange={this.handleChange}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(ConsultorioEditar);
