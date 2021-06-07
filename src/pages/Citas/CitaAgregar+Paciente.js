import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../components/Cita/Agregar/Agregar+Paciente';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  especialidadesDoctoresDropdown,
  especialidadesDropdown,
  horasMinutos,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../components/utils';

class CitasAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,

      cita: {
        fecha: '',
        hora: '',
        motivo_cita: '',
        createdAt: new Date(),
        medico_id: null,
        paciente_id: '',
        telefono_paciente: '',
      },
      especialidades: [],
      medicos: [],
      paciente: {
        tipo_de_sangre_id: 0,
        etnia_id: 0,
        nivel_de_instruccion_id: 0,
        estado_civil_id: 0,
        nombre: '',
        apellido: '',
        cedula: null,
        fecha_nacimiento: null,
        lugar_nacimiento: '',
        direccion: '',
        telefono: '',
        email: null,
        genero_id: 0,
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        createdAt: new Date(),
      },
      sesion: false,
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

      if (especialidades.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          especialidades: especialidadesDropdown(especialidades.data),
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
      cita: {
        ...this.state.cita,
        fecha: this.state.cita.fecha,
        motivo_cita: this.state.cita.motivo_cita,
        medico_id: this.state.cita.medico_id,

        telefono_paciente: this.state.cita.telefono_paciente,
        hora: this.state.cita.hora,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleChangePaciente = (e) => {
    this.setState({
      paciente: {
        ...this.state.paciente,
        nombre: this.state.paciente.nombre,
        apellido: this.state.paciente.apellido,
        telefono: this.state.paciente.telefono,
        [e.target.name]: e.target.value,
      },
    });
  };

  saveData = async () => {
    trimData(this.state.cita);
    trimData(this.state.paciente);
    try {
      const { data: paciente } = await axios.post(
        `${api_url}/api/paciente`,
        this.state.paciente,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      this.state.cita.paciente_id = paciente.data.paciente_id;
      const { data: cita } = await axios.post(
        `${api_url}/api/cita`,
        this.state.cita,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (cita.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        if (cita.data) {
          openNotification(
            'info',
            'Citas',
            `El ${this.state.cita.fecha} a las ${this.state.cita.hora} ya existe una cita agendada para el paciente ${cita.data.pacientes.apellido} 
            ${cita.data.pacientes.nombre} con un especialista de ${cita.data.medicos.especialidad[0].value}`,
            ''
          );
        } else {
          openNotification(
            'success',
            'Citas',
            'Cita agendada exitosamente',
            ''
          );
          this.props.history.push(`/citas/${new Date()}/month`);
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
  onClickButtonSaveCita = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    if (this.state.cita.medico_id === null) {
      this.setState({
        loading: false,
      });
      openNotification('error', 'Citas', 'Seleccione un médico', '');
    } else if (this.state.cita.hora === '') {
      this.setState({
        loading: false,
      });
      openNotification('error', 'Citas', 'Seleccione hora de la cita', '');
    } else {
      this.setState({
        loading: false,
      });
      this.saveData();
    }
  };

  handleOnChangeHora = (e, data) => {
    this.state.cita.hora = data.value;
  };
  handleOnChangeEspecialidad = async (e, data) => {
    try {
      const { data: medicos } = await axios.get(
        `${api_url}/api/medicos_especialidades/${data.value}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (medicos.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          medicos: especialidadesDoctoresDropdown(medicos.data),
        });
      }
    } catch (error) {
      this.setState({
        error: error,
      });
    }
  };
  handleOnChangeMedico = (e, data) => {
    this.state.cita.medico_id = data.value;
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Layout activeKeyP="1">
          <Navbar />
          {!this.state.sesion && (
            <Agregar
              id="formAgregar"
              handleChangePaciente={this.handleChangePaciente}
              formPaciente={this.state.paciente}
              onClickButtonSaveCita={this.onClickButtonSaveCita}
              formCita={this.state.cita}
              handleChange={this.handleChange}
              horas={horasMinutos(8, 20)}
              handleOnChangeHora={this.handleOnChangeHora}
              especialidades={this.state.especialidades}
              handleOnChangeEspecialidad={this.handleOnChangeEspecialidad}
              medicos={this.state.medicos}
              handleOnChangeMedico={this.handleOnChangeMedico}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitasAgregar);
