import axios from 'axios';
import generator from 'generate-password';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../../components/Admin/Usuarios/Agregar';
import Layout from '../../../components/Layout/Layout';
import Navbar from '../../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  consultorioDropdown,
  especialidadesDropdownUsuarios,
  mapStateToProps,
  openNotification,
  regexEmail,
  rolesDropdown,
  trimData,
} from '../../../components/utils';

class UsuarioAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      buttonDisable: false,
      emailCorrect: false,
      roles: [],
      consultorios: [],
      especialidades: [],
      usuarioNombre: '',
      medico: {},
      usuario: {},
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
      const { data: roles } = await axios.get(`${api_url}/api/roles`);
      const { data: especialidades } = await axios.get(
        `${api_url}/api/especialidades`
      );
      const { data: consultorios } = await axios.get(
        `${api_url}/api/consultorios`
      );
      const { data: usuario } = await axios.get(
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`
      );
      const { data: medico } = await axios.get(
        `${api_url}/api/medicos_usuario_id/${this.props.match.params.usuarioId}`
      );
      this.setState({
        roles: rolesDropdown(roles.data),
        especialidades: especialidadesDropdownUsuarios(especialidades.data),
        consultorios: consultorioDropdown(consultorios.data),
        usuario: usuario.data,
        medico: medico.data !== null ? medico.data : '',
        loading: false,
      });
      trimData(this.state.medico);
      trimData(this.state.usuario);
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

    if (this.state.usuario.email !== '') {
      if (this.state.usuario.email.match(regexEmail)) {
        this.setState({
          buttonDisable: false,
          emailCorrect: false,
        });
      } else {
        this.setState({
          emailCorrect: true,
          buttonDisable: true,
        });
      }
    }
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
      var i = element.split(' ');
      option.push({ id: parseInt(i[0]), value: i[1] });
    });
    return option;
  };

  //traer especialidades selccionadas
  especialidadesSelect = () => {
    let opcion = [];
    if (this.state.medico !== '') {
      this.state.medico.especialidad.map((item) => {
        opcion.push(item.id + ' ' + item.value.trim().toUpperCase());
      });
    }

    return opcion;
  };
  //guardar cita
  onClickButtonSaveUsuario = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });

    trimData(this.state.usuario);
    trimData(this.state.medico);

    try {
      const { data: usuario } = await axios.patch(
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`,
        this.state.usuario
      );
      console.log(usuario);
      if (this.state.usuario.rol_id === 2) {
        this.setState({
          medico: {
            ...this.state.medico,
            usuario_id: usuario.data.usuario_id,
            especialidad: this.state.medico.especialidad,
          },
        });
        if (this.state.medico) {
          await axios.put(
            `${api_url}/api/medico/${this.state.medico.medico_id}`,
            this.state.medico
          );
        } else {
          await axios.post(`${api_url}/api/medico`, this.state.medico);
        }
      }

      this.setState({
        loading: false,
        success: true,
        error: null,
      });

      openNotification(
        'success',
        'Usuarios',
        'Usuario editado exitosamente',
        ''
      );
      this.props.history.push('/admin/usuarios');
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.medico);
    return (
      <React.Fragment>
        <Layout activeKeyP='4'>
          <Navbar buttonDisable={this.state.buttonDisable} />

          <Agregar
            id='formAgregar'
            usuariopass={false}
            onClickButtonSaveUsuario={this.onClickButtonSaveUsuario}
            formUsuario={this.state.usuario}
            handleChange={this.handleChange}
            especialidades={this.state.especialidades}
            roles={this.state.roles}
            consultorios={this.state.consultorios}
            handleOnChangeConsultorio={this.handleOnChangeConsultorio}
            handleOnChangeEspecialidad={this.handleOnChangeEspecialidad}
            emailCorrect={this.state.emailCorrect}
            especialidadesSelect={this.especialidadesSelect()}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioAgregar);
