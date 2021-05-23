import axios from 'axios';
import generator from 'generate-password';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../../components/Admin/Medicos/Agregar';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import Navbar from '../../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  consultorioDropdown,
  especialidadesDropdownUsuarios,
  mapStateToProps,
  openNotification,
  regexEmail,
  trimData,
} from '../../../components/utils';

class MedicoAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      consultorios: [],
      especialidades: [],
      usuarioNombre: '',
      medico: {
        usuario_id: '',
        especialidad: '',
      },
      usuario: {
        rol_id: 2,
        consultorio_id: 1,
        usuario: '',
        contrasena: generator
          .generate({
            length: 6,
            numbers: true,
          })
          .toUpperCase(),
        cedula: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        createdAt: new Date(),
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
      loading: true,
      error: null,
    });
    try {
      const { data: especialidades } = await axios.get(
        `${api_url}/api/especialidades/`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: consultorios } = await axios.get(
        `${api_url}/api/consultorios/`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (especialidades.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          especialidades: especialidadesDropdownUsuarios(especialidades.data),
          consultorios: consultorioDropdown(consultorios.data),
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
      usuario: {
        ...this.state.usuario,
        rol_id: this.state.usuario.rol_id,
        consultorio_id: this.state.usuario.consultorio_id,
        usuario: this.state.usuarioNombre,
        contrasena: this.state.usuario.contrasena,
        cedula: this.state.usuario.cedula,
        nombre: this.state.usuario.nombre,
        apellido: this.state.usuario.apellido,
        email: this.state.usuario.email,
        telefono: this.state.usuario.telefono,
        fecha_nacimiento: this.state.usuario.fecha_nacimiento,
        [e.target.name]: e.target.value,
      },
    });
    this.usuarioGenerator();
  };

  handleOnChangeConsultorio = (e, data) => {
    this.state.usuario.consultorio_id = data.value;
  };
  handleOnChangeEspecialidad = (e, data) => {
    this.state.medico.especialidad = this.saveEspecialidad(data.value);
  };

  //guardar especialidades
  saveEspecialidad = (arr) => {
    var option = [];
    arr.forEach((element) => {
      var i = element.split('$');
      option.push({ id: parseInt(i[0]), value: i[1] });
    });
    return option;
  };

  //generar usuario
  usuarioGenerator = () => {
    if (
      this.state.usuario.nombre !== undefined &&
      this.state.usuario.apellido !== undefined
    ) {
      let nombre = this.state.usuario.nombre.split(' ');
      let apellido = this.state.usuario.apellido.split(' ');
      let random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      this.setState({
        usuarioNombre: (
          nombre[0].substr(0, 2) +
          apellido[0] +
          random
        ).toUpperCase(),
      });
    }
  };

  saveData = async () => {
    trimData(this.state.usuario);
    // trimData(this.state.medico);
    try {
      const { data: usuario } = await axios.post(
        `${api_url}/api/usuario`,
        this.state.usuario,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      this.setState({
        medico: {
          ...this.state.medico,
          usuario_id: usuario.info.usuario_id,
          especialidad: this.state.medico.especialidad,
        },
      });
      const medico = await axios.post(
        `${api_url}/api/medico`,
        this.state.medico,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (usuario.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        if (usuario.info.exist) {
          openNotification(
            'warning',
            'Médicos',
            'Ya existe un usuario registrado con el número de cédula ',
            `${this.state.usuario.cedula}`
          );
        } else {
          openNotification(
            'success',
            'Médicos',
            'Médico creado exitosamente',
            ''
          );
          this.props.history.push(
            `/admin/medico/${medico.data.data.medico_id}`
          );
        }
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //guardar cita
  onClickButtonSaveMedico = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    if (!this.state.usuario.email.match(regexEmail)) {
      this.setState({
        loading: false,
      });
      openNotification('error', 'Médicos', 'Correo electrónico no válido', '');
    } else if (
      this.state.usuario.rol_id === 2 &&
      this.state.medico.especialidad === ''
    ) {
      this.setState({
        loading: false,
      });
      openNotification(
        'error',
        'Médicos',
        'Seleccione una o varias especialidades',
        ''
      );
    } else {
      this.setState({
        loading: false,
      });
      this.saveData();
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
              headerC="Nuevo Médico"
              icon="add circle"
              onClickButtonSaveMedico={this.onClickButtonSaveMedico}
              formUsuario={this.state.usuario}
              handleChange={this.handleChange}
              especialidades={this.state.especialidades}
              roles={this.state.roles}
              consultorios={this.state.consultorios}
              handleOnChangeConsultorio={this.handleOnChangeConsultorio}
              handleOnChangeEspecialidad={this.handleOnChangeEspecialidad}
              emailCorrect={this.state.emailCorrect}
            />
          )}

          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(MedicoAgregar);
