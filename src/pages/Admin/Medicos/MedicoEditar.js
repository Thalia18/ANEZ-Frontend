import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editar from '../../../components/Admin/Medicos/Agregar';
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
} from '../../../components/utils/index';

class MedicoEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,

      consultorios: [],
      especialidades: [],

      medico: {},
      medicoUpdate: {},
      usuario: {},
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
        `${api_url}/api/especialidades`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: consultorios } = await axios.get(
        `${api_url}/api/consultorios`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      const { data: medico } = await axios.get(
        `${api_url}/api/medico/${this.props.match.params.medicoId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: usuario } = await axios.get(
        `${api_url}/api/usuario/${medico.data.usuario_id}`,
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
        trimData(usuario.data);
        this.setState({
          especialidades: especialidadesDropdownUsuarios(especialidades.data),
          consultorios: consultorioDropdown(consultorios.data),
          usuario: usuario.data,
          medico: medico.data,
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

  saveData = async () => {
    trimData(this.state.usuario);
    trimData(this.state.medico);

    try {
      this.setState({
        medicoUpdate: {
          ...this.state.medicoUpdate,
          usuario_id: this.state.usuario.usuario_id,
          especialidad: this.state.medicoUpdate.especialidad,
        },
      });

      const { data: usuario } = await axios.patch(
        `${api_url}/api/usuario/${this.state.medico.usuario_id}`,
        this.state.usuario,
        {
          method: 'PATCH',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      await axios.put(
        `${api_url}/api/medico/${this.state.medico.medico_id}`,
        this.state.medicoUpdate,
        {
          method: 'PUT',
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
      }

      if (usuario.data.exist) {
        openNotification(
          'warning',
          'Médicos',
          'Ya existe un médico registrado con el número de cédula ',
          `${this.state.usuario.cedula}`
        );
      } else {
        openNotification(
          'success',
          'Médicos',
          'Médico editado exitosamente',
          ''
        );
        this.props.history.push(`/admin/medico/${this.state.medico.medico_id}`);
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

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
      openNotification('error', 'Usuarios', 'Correo electrónico no válido', '');
    } else if (this.state.usuario.rol_id === 2)
      if (
        (this.state.medicoUpdate.especialidad === undefined &&
          this.state.medico.especialidad.length > 0) ||
        (this.state.medicoUpdate.especialidad !== undefined &&
          this.state.medico.especialidad.length === 0 &&
          this.state.medicoUpdate.especialidad.length > 0) ||
        (this.state.medicoUpdate.especialidad !== undefined &&
          this.state.medico.especialidad.length > 0 &&
          this.state.medicoUpdate.especialidad.length > 0)
      ) {
        this.setState({
          loading: false,
        });
        this.saveData();
      } else {
        this.setState({
          loading: false,
        });
        openNotification(
          'error',
          'Médicos',
          'Seleccione una o varias especialidades',
          ''
        );
      }
    else {
      this.setState({
        loading: false,
      });
      this.saveData();
    }
  };

  //setear los datos del formulario de usuario
  handleChange = (e) => {
    this.setState({
      usuario: {
        ...this.state.usuario,
        rol_id: this.state.usuario.rol_id,
        consultorio_id: this.state.usuario.consultorio_id,
        cedula: this.state.usuario.cedula,
        nombre: this.state.usuario.nombre,
        apellido: this.state.usuario.apellido,
        email: this.state.usuario.email,
        telefono: this.state.usuario.telefono,
        fecha_nacimiento: this.state.usuario.fecha_nacimiento,
        updatedAt: new Date(),
        [e.target.name]: e.target.value,
      },
    });
  };

  handleOnChangeConsultorio = (e, data) => {
    this.state.usuario.consultorio_id = data.value;
  };
  handleOnChangeEspecialidad = (e, data) => {
    this.state.medicoUpdate.especialidad = this.saveEspecialidad(data.value);
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

  //traer especialidades selccionadas
  especialidadesSelect = (lista) => {
    let opcion = [];
    if (lista) {
      lista.map((item) => {
        opcion.push(item.id + '$' + item.value);
      });
    }
    return opcion;
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Layout activeKeyP="5">
          <Navbar />

          {!this.state.sesion && (
            <Editar
              headerC="Editar Médico"
              icon="edit"
              onClickButtonSaveMedico={this.onClickButtonSaveMedico}
              formUsuario={this.state.usuario}
              handleChange={this.handleChange}
              especialidades={this.state.especialidades}
              consultorios={this.state.consultorios}
              handleOnChangeConsultorio={this.handleOnChangeConsultorio}
              handleOnChangeEspecialidad={this.handleOnChangeEspecialidad}
              especialidadesSelect={this.especialidadesSelect(
                this.state.medico.especialidad
              )}
              tipo={true}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(MedicoEditar);
