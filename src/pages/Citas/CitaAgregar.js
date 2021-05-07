import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../components/Cita/Agregar/Agregar';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  especialidadesDoctoresDropdown,
  especialidadesDropdown,
  fechaCitas,
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
      paciente: {},
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
      const { data } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (data.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
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
        this.setState({
          paciente: data.data,
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
        paciente_id: this.props.match.params.pacienteId,
        telefono_paciente: this.state.cita.telefono_paciente,
        hora: this.state.cita.hora,
        [e.target.name]: e.target.value,
      },
    });
  };

  saveData = async () => {
    trimData(this.state.cita);
    try {
      const { data: cita } = await axios.post(
        `${api_url}/api/cita`,
        this.state.cita,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.accessToken,
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
          success: true,
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
          this.props.history.push(`/citas/${fechaCitas(new Date())}/month`);
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
  onClickButtonSaveCita = async (e) => {
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
            Authorization: this.props.jwt.accessToken,
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
              paciente={this.state.paciente}
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
