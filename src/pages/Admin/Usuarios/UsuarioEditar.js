import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../../components/Admin/Usuarios/Agregar';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import Sesion from '../../../components/Modales/ModalSesionExperida';
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
} from '../../../components/utils/index';

class UsuarioEditar extends Component {
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
      const { data: roles } = await axios.get(`${api_url}/api/roles`, {
        method: 'GET',
        headers: {
          Authorization: this.props.jwt.accessToken,
          auth: this.props.user.rol,
        },
      });
      const { data: especialidades } = await axios.get(
        `${api_url}/api/especialidades`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: consultorios } = await axios.get(
        `${api_url}/api/consultorios`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: usuario } = await axios.get(
        `${api_url}/api/usuario/${this.props.match.params.usuarioId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      const { data: medico } = await axios.get(
        `${api_url}/api/medicos_usuario_id/${this.props.match.params.usuarioId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (roles.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        trimData(usuario.data);
        this.setState({
          roles: rolesDropdown(roles.data),
          especialidades: especialidadesDropdownUsuarios(especialidades.data),
          consultorios: consultorioDropdown(consultorios.data),
          usuario: usuario.data,
          medico: medico.data !== null ? medico.data : {},
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
        cedula: this.state.usuario.cedula,
        nombre: this.state.usuario.nombre,
        apellido: this.state.usuario.apellido,
        email: this.state.usuario.email,
        telefono: this.state.usuario.telefono,
        fecha_nacimiento: this.state.usuario.fecha_nacimiento,
        updated_at: new Date(),
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
  //guardar usuario
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
        this.state.usuario,
        {
          method: 'PATCH',
          headers: {
            Authorization: this.props.jwt.accessToken,
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
        if (this.state.usuario.rol_id === 2) {
          this.setState({
            medicoUpdate: {
              ...this.state.medicoUpdate,
              usuario_id: this.state.usuario.usuario_id,
              especialidad: this.state.medicoUpdate.especialidad,
            },
          });
          if (Object.values(this.state.medico).length > 0) {
            await axios.put(
              `${api_url}/api/medico/${this.state.medico.medico_id}`,
              this.state.medicoUpdate,
              {
                method: 'PUT',
                headers: {
                  Authorization: this.props.jwt.accessToken,
                  auth: this.props.user.rol,
                },
              }
            );
          } else {
            await axios.post(`${api_url}/api/medico`, this.state.medicoUpdate, {
              method: 'POST',
              headers: {
                Authorization: this.props.jwt.accessToken,
                auth: this.props.user.rol,
              },
            });
          }
        } else {
          if (Object.values(this.state.medico).length > 0) {
            await axios.delete(
              `${api_url}/api/medico/${this.state.medico.medico_id}`,
              {
                method: 'DELETE',
                headers: {
                  Authorization: this.props.jwt.accessToken,
                  auth: this.props.user.rol,
                },
              }
            );
          }
        }

        this.setState({
          loading: false,
          success: true,
          error: null,
        });
        if (usuario.data.exist) {
          openNotification(
            'warning',
            'Usuarios',
            'Ya existe un usuario registrado con el número de cédula ',
            `${this.state.usuario.cedula}`
          );
        } else {
          openNotification(
            'success',
            'Usuarios',
            'Usuario editado exitosamente',
            ''
          );
          this.props.history.push('/admin/usuarios');
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
        <Layout activeKeyP="4">
          <Navbar buttonDisable={this.state.buttonDisable} />

          {!this.state.sesion && (
            <Agregar
              id="formAgregar"
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
              especialidadesSelect={this.especialidadesSelect(
                this.state.medico.especialidad
              )}
              rol_id={this.state.usuario.rol_id}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(UsuarioEditar);
