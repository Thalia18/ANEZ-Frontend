import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Editar from '../../components/Paciente/Agregar/Agregar';
import Navbar from '../../components/Paciente/Editar/NavbarEditar';
import {
  api_url,
  estadoCivilDropdown,
  etniasDropdown,
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
      success: false,
      error: null,
      loading: true,
      paciente: {},
      etnias: {},
      tipoDeSangre: {},
      estadoCivil: {},
      nivelDeInstruccion: {},
      optionEC: [],
      optionTS: [],
      optionNI: [],
      optionE: [],
      buttonDisable: false,

      emailCorrect: undefined,
      cedulaLength: undefined,
      pacienteOriginal: {},
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
        pacienteOriginal: pacienteA.data,
        loading: false,
      });
      trimData(this.state.paciente);
      this.opcionesSelect();
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //funcion para cargar los dropdown del componente editar
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
        email: this.state.paciente.email,
        contacto_emergencia_nombre: this.state.paciente
          .contacto_emergencia_nombre,
        contacto_emergencia_telefono: this.state.paciente
          .contacto_emergencia_telefono,
        [e.target.name]: e.target.value,
        updated_at: new Date(),
      },
    });

    //verificar correo valido
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
      openNotification(
        'success',
        'Pacientes',
        'Paciente editado exitosamente',
        ''
      );
      this.props.history.push('/pacientes');
    } catch (error) {
      openNotification(
        'warning',
        'Pacientes',
        'Ya existe un paciente registrado con el número de cédula ',
        `${this.state.paciente.cedula}`
      );
      this.props.history.goBack();

      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //obtener datos de dropdown
  handleOnChangeEC = (e, data) => {
    this.state.paciente.estado_civil_id = data.value;
    this.setState({
      buttonDisable: false,
    });
  };
  handleOnChangeTS = (e, data) => {
    this.state.paciente.tipo_de_sangre_id = data.value;
    this.setState({
      buttonDisable: false,
    });
  };
  handleOnChangeNI = (e, data) => {
    this.state.paciente.nivel_de_instruccion_id = data.value;
    this.setState({
      buttonDisable: false,
    });
  };
  handleOnChangeE = (e, data) => {
    this.state.paciente.etnia_id = data.value;
    this.setState({
      buttonDisable: false,
    });
  };

  closeModal = () => {
    this.setState({
      success: false,
    });
    this.props.history.push('/pacientes');
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;

    return (
      <React.Fragment>
        <Layout activeKeyP="3">
          <Navbar
            success={this.state.success}
            buttonDisable={this.state.buttonDisable}
          />
          <Editar
            header="Editar Paciente"
            icon="edit"
            id="formEditar"
            // campos={false}
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
            closeModal={this.closeModal}
            emailCorrect={this.state.emailCorrect}
            cedulaLength={this.state.cedulaLength}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(PacienteEditar);
