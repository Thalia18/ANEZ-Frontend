import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Agregar from '../../components/Paciente/Agregar/Agregar';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import { api_url, openNotification, trimData } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';
import {
  estadoCivilDropdown,
  etniasDropdown,
  nivelDeInstruccionDropdown,
  tipoDeSangreDropdown,
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
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        created_at: new Date(),
      },
      etnias: {},
      tipoDeSangre: {},
      estadoCivil: {},
      nivelDeInstruccion: {},
      optionEC: [],
      optionTS: [],
      optionNI: [],
      optionE: [],
      buttonDisable: true,
      fechaError: false,
      campos: true,
      cedulaLength: false,
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
      const { data: etnias } = await axios.get(`${api_url}/api/etnias`);
      const { data: estadosCiviles } = await axios.get(
        `${api_url}/api/estados_civiles`
      );
      const { data: tiposDeSangre } = await axios.get(
        `${api_url}/api/tipos_de_sangre`
      );
      const { data: nivelesDeInstruccion } = await axios.get(
        `${api_url}/api/niveles_de_instruccion`
      );
      this.setState({
        etnias: etnias.data,
        estadoCivil: estadosCiviles.data,
        tipoDeSangre: tiposDeSangre.data,
        nivelDeInstruccion: nivelesDeInstruccion.data,
        loading: false,
      });
      this.opcionesSelect();
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //funcion para cargar los dropdown del componente agregar
  opcionesSelect = () => {
    this.setState({
      optionEC: estadoCivilDropdown(this.state.estadoCivil),
      optionE: etniasDropdown(this.state.etnias),
      optionNI: nivelDeInstruccionDropdown(this.state.nivelDeInstruccion),
      optionTS: tipoDeSangreDropdown(this.state.tipoDeSangre),
    });
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
        nombre: this.state.paciente.nombre,
        apellido: this.state.paciente.apellido,
        cedula: this.state.paciente.cedula,
        fecha_nacimiento: this.state.paciente.fecha_nacimiento,
        lugar_nacimiento: this.state.paciente.lugar_nacimiento,
        direccion: this.state.paciente.direccion,
        telefono: this.state.paciente.telefono,
        contacto_emergencia_nombre: this.state.paciente
          .contacto_emergencia_nombre,
        contacto_emergencia_telefono: this.state.paciente
          .contacto_emergencia_telefono,
        [e.target.name]: e.target.value,
      },
    });
    var hoy = new Date();
    var nacimiento = new Date(this.state.paciente.fecha_nacimiento);
    if (
      this.state.paciente.etnia_id !== null &&
      this.state.paciente.nivel_de_instruccion_id !== null &&
      this.state.paciente.estado_civil_id !== null &&
      this.state.paciente.tipo_de_sangre_id !== null &&
      this.state.paciente.cedula !== null
    ) {
      this.setState({
        campos: false,
      });
      if (nacimiento < hoy) {
        this.setState({
          buttonDisable: false,
          fechaError: false,
        });
      } else {
        this.setState({
          fechaError: true,
          buttonDisable: true,
        });
      }
      if (this.state.paciente.cedula.length >= 10) {
        this.setState({
          buttonDisable: false,
          cedulaLength: false,
        });
      } else {
        this.setState({
          cedulaLength: true,
          buttonDisable: true,
        });
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
        this.state.paciente
      );
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
      }
      this.props.history.push('/pacientes');
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

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='3'>
          <Navbar buttonDisable={this.state.buttonDisable} />
          <Agregar
            etnias={this.state.optionE}
            nivelDeInstruccion={this.state.optionNI}
            estadoCivil={this.state.optionEC}
            onClickButtonSavePaciente={this.onClickButtonSavePaciente}
            tipoDeSangre={this.state.optionTS}
            handleChange={this.handleChange}
            formPaciente={this.state.paciente}
            handleOnChangeEC={this.handleOnChangeEC}
            handleOnChangeTS={this.handleOnChangeTS}
            handleOnChangeNI={this.handleOnChangeNI}
            handleOnChangeE={this.handleOnChangeE}
            fechaError={this.state.fechaError}
            campos={this.state.campos}
            cedulaLength={this.state.cedulaLength}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteAgregar);
