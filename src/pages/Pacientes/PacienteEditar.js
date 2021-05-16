import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Editar from '../../components/Paciente/Agregar/Agregar';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  estadoCivilDropdown,
  etniasDropdown,
  generosDropdown,
  mapStateToProps,
  nivelDeInstruccionDropdown,
  openNotification,
  regexEmail,
  tipoDeSangreDropdown,
  trimData,
} from '../../components/utils';

class PacienteEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      paciente: {},
      etnias: [],
      tipoDeSangre: [],
      estadoCivil: [],
      nivelDeInstruccion: [],
      genero: [],

      sesion: false,
      pacienteOriginal: {},
    };
  }
  componentDidMount() {
    if (this.props.user != null && this.props.user.isLoggedIn) {
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
      const { data: pacienteA } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (pacienteA.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: generos } = await axios.get(`${api_url}/api/generos`, {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        });
        const { data: etnias } = await axios.get(`${api_url}/api/etnias`, {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        });
        const { data: estadosCiviles } = await axios.get(
          `${api_url}/api/estados_civiles`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        const { data: tiposDeSangre } = await axios.get(
          `${api_url}/api/tipos_de_sangre`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        const { data: nivelesDeInstruccion } = await axios.get(
          `${api_url}/api/niveles_de_instruccion`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        trimData(pacienteA.data);
        this.setState({
          etnias: etniasDropdown(etnias.data),
          estadoCivil: estadoCivilDropdown(estadosCiviles.data),
          tipoDeSangre: tipoDeSangreDropdown(tiposDeSangre.data),
          nivelDeInstruccion: nivelDeInstruccionDropdown(
            nivelesDeInstruccion.data
          ),
          genero: generosDropdown(generos.data),
          paciente: pacienteA.data,
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

  //setear los datos del formulario de paciente
  handleChange = (e) => {
    this.setState({
      paciente: {
        ...this.state.paciente,
        tipo_de_sangre_id: this.state.paciente.tipo_de_sangre_id,
        etnia_id: this.state.paciente.etnia_id,
        nivel_de_instruccion_id: this.state.paciente.nivel_de_instruccion_id,
        estado_civil_id: this.state.paciente.estado_civil_id,
        genero_id: this.state.paciente.genero_id,
        nombre: this.state.paciente.nombre,
        apellido: this.state.paciente.apellido,
        cedula: this.state.paciente.cedula,
        fecha_nacimiento: this.state.paciente.fecha_nacimiento,
        lugar_nacimiento: this.state.paciente.lugar_nacimiento,
        direccion: this.state.paciente.direccion,
        telefono: this.state.paciente.telefono,
        email: this.state.paciente.email,
        contacto_emergencia_nombre:
          this.state.paciente.contacto_emergencia_nombre,
        contacto_emergencia_telefono:
          this.state.paciente.contacto_emergencia_telefono,
        [e.target.name]: e.target.value,
        updatedAt: new Date(),
      },
    });
  };

  saveData = async () => {
    trimData(this.state.paciente);
    try {
      const { data: paciente } = await axios.put(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        this.state.paciente,
        {
          method: 'PUT',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (paciente.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
      }

      if (paciente.data.exist) {
        openNotification(
          'warning',
          'Pacientes',
          'Ya existe un paciente registrado con el número de cédula ',
          `${this.state.paciente.cedula}`
        );
      } else {
        openNotification(
          'success',
          'Pacientes',
          'Paciente editado exitosamente',
          ''
        );
        this.props.history.push('/pacientes');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //guardar paciente
  onClickButtonSavePaciente = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    if (!this.state.paciente.email.match(regexEmail)) {
      this.setState({
        loading: false,
      });
      openNotification(
        'error',
        'Pacientes',
        'Correo electrónico no válido',
        ''
      );
    } else {
      this.setState({
        loading: false,
      });
      this.saveData();
    }
  };

  //obtener datos de dropdown
  handleOnChangeEC = (e, data) => {
    this.state.paciente.estado_civil_id = data.value;
  };
  handleOnChangeTS = (e, data) => {
    this.state.paciente.tipo_de_sangre_id = data.value;
  };
  handleOnChangeNI = (e, data) => {
    this.state.paciente.nivel_de_instruccion_id = data.value;
  };
  handleOnChangeE = (e, data) => {
    this.state.paciente.etnia_id = data.value;
  };

  handleOnChangeG = (e, data) => {
    this.state.paciente.genero_id = data.value;
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="3">
          <Navbar />
          {!this.state.sesion && (
            <Editar
              header="Editar Paciente"
              icon="edit"
              etnias={this.state.etnias}
              nivelDeInstruccion={this.state.nivelDeInstruccion}
              estadoCivil={this.state.estadoCivil}
              onClickButtonSavePaciente={this.onClickButtonSavePaciente}
              tipoDeSangre={this.state.tipoDeSangre}
              generos={this.state.genero}
              handleChange={this.handleChange}
              formPaciente={this.state.paciente}
              handleOnChangeEC={this.handleOnChangeEC}
              handleOnChangeTS={this.handleOnChangeTS}
              handleOnChangeNI={this.handleOnChangeNI}
              handleOnChangeE={this.handleOnChangeE}
              handleOnChangeG={this.handleOnChangeG}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteEditar);
