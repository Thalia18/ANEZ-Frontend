import axios from 'axios';
import React, { Component } from 'react';

import Layout from '../components/Layout/Layout';
import Editar from '../components/Paciente/Editar/Editar';
import Navbar from '../components/Paciente/Editar/NavbarEditar';
import { api_url } from '../components/utils';

class PacienteAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      loading: true,
      activePage: '3',
      paciente: {
        // tipo_de_sangre_id: null,
        // etnia_id: null,
        // nivel_de_instruccion_id: null,
        // estado_civil_id: null,
        // nombre: '',
        // apellido: '',
        // cedula: '',
        // fecha_nacimiento: '',
        // lugar_nacimiento: '',
        // direccion: '',
        // telefono: '',
        // contacto_emergencia_nombre: '',
        // contacto_emergencia_telefono: '',
        // created_at: new Date(),
      },
      etnias: {},
      tipoDeSangre: {},
      estadoCivil: {},
      nivelDeInstruccion: {},
      optionEC: [],
      optionTS: [],
      optionNI: [],
      optionE: [],
      a: true,
    };
  }
  componentDidMount() {
    if (this.state.a) {
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
      const { data: pacienteA } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );
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
        paciente: pacienteA.data,

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
    let opcion = [];
    Object.values(this.state.estadoCivil).map((item) => {
      opcion.push({
        key: item.estado_civil_id,
        text: item.estado_civil.trim(),
        value: item.estado_civil_id,
      });
      this.setState({
        optionEC: opcion,
      });
    });
    opcion = [];
    Object.values(this.state.tipoDeSangre).map((item) => {
      opcion.push({
        key: item.tipo_de_sangre_id,
        text: item.tipo_de_sangre.trim(),
        value: item.tipo_de_sangre_id,
      });
      this.setState({
        optionTS: opcion,
      });
    });
    opcion = [];
    Object.values(this.state.nivelDeInstruccion).map((item) => {
      opcion.push({
        key: item.nivel_de_instruccion_id,
        text: item.nivel_de_instruccion.trim(),
        value: item.nivel_de_instruccion_id,
      });
      this.setState({
        optionNI: opcion,
      });
    });
    opcion = [];
    Object.values(this.state.etnias).map((item) => {
      opcion.push({
        key: item.etnia_id,
        text: item.etnia.trim(),
        value: item.etnia_id,
      });
      this.setState({
        optionE: opcion,
      });
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
  };

  //guardar paciente
  onClickButtonSavePaciente = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    try {
      await axios.put(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        this.state.paciente
      );
      this.setState({
        loading: false,
        success: true,
        error: null,
        paciente: {},
      });
    } catch (error) {
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
          <Navbar />
          <Editar
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
            success={this.state.success}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default PacienteAgregar;
