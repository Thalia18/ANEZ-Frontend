import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExperida';
import Agregar from '../../components/Paciente/Agregar/Agregar';
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

class PacienteAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      loading: true,
      result: '',
      paciente: {
        tipo_de_sangre_id: null,
        etnia_id: null,
        nivel_de_instruccion_id: null,
        estado_civil_id: null,
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        lugar_nacimiento: '',
        direccion: '',
        telefono: '',
        email: '',
        genero_id: '',
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        created_at: new Date(),
      },
      etnias: [],
      tipoDeSangre: [],
      estadoCivil: [],
      nivelDeInstruccion: [],
      genero: [],

      buttonDisable: true,
      emailCorrect: false,
      campos: true,
      sesion: false,
      cedulaLength: false,
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
      const { data: etnias } = await axios.get(`${api_url}/api/etnias`, {
        method: 'GET',
        headers: {
          Authorization: this.props.jwt.accessToken,
          auth: this.props.user.rol,
        },
      });

      if (etnias.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: generos } = await axios.get(`${api_url}/api/generos`, {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        });
        const { data: estadosCiviles } = await axios.get(
          `${api_url}/api/estados_civiles`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        const { data: tiposDeSangre } = await axios.get(
          `${api_url}/api/tipos_de_sangre`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        const { data: nivelesDeInstruccion } = await axios.get(
          `${api_url}/api/niveles_de_instruccion`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          etnias: etniasDropdown(etnias.data),
          estadoCivil: estadoCivilDropdown(estadosCiviles.data),
          tipoDeSangre: tipoDeSangreDropdown(tiposDeSangre.data),
          nivelDeInstruccion: nivelDeInstruccionDropdown(
            nivelesDeInstruccion.data
          ),
          genero: generosDropdown(generos.data),
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
        contacto_emergencia_nombre: this.state.paciente
          .contacto_emergencia_nombre,
        contacto_emergencia_telefono: this.state.paciente
          .contacto_emergencia_telefono,
        [e.target.name]: e.target.value,
      },
    });

    //setea variables para mensajes de error y alerta
    if (
      this.state.paciente.etnia_id !== null &&
      this.state.paciente.nivel_de_instruccion_id !== null &&
      this.state.paciente.estado_civil_id !== null &&
      this.state.paciente.tipo_de_sangre_id !== null &&
      this.state.paciente.genero_id !== null
    ) {
      this.setState({
        campos: false,
      });

      if (this.state.paciente.email !== '') {
        if (this.state.paciente.email.match(regexEmail)) {
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
    }
  };

  //guardar paciente
  onClickButtonSavePaciente = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    trimData(this.state.paciente);
    try {
      const result = await axios.post(
        `${api_url}/api/paciente`,
        this.state.paciente,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (result.data.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          success: true,
          error: null,
          result: result.data,
        });
        if (this.state.result.data.exist) {
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
            'Paciente creado exitosamente',
            ''
          );
          this.props.history.push('/pacientes');
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
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
          <Navbar buttonDisable={this.state.buttonDisable} />
          {!this.state.sesion && (
            <Agregar
              header="Nuevo Paciente"
              icon="add circle"
              id="formAgregar"
              etnias={this.state.etnias}
              generos={this.state.genero}
              nivelDeInstruccion={this.state.nivelDeInstruccion}
              estadoCivil={this.state.estadoCivil}
              onClickButtonSavePaciente={this.onClickButtonSavePaciente}
              tipoDeSangre={this.state.tipoDeSangre}
              handleChange={this.handleChange}
              formPaciente={this.state.paciente}
              handleOnChangeEC={this.handleOnChangeEC}
              handleOnChangeTS={this.handleOnChangeTS}
              handleOnChangeNI={this.handleOnChangeNI}
              handleOnChangeE={this.handleOnChangeE}
              handleOnChangeG={this.handleOnChangeG}
              campos={this.state.campos}
              cedulaLength={this.state.cedulaLength}
              emailCorrect={this.state.emailCorrect}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteAgregar);
