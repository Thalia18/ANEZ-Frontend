import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../components/Cita/Editar/Editar';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExperida';
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

class CitasEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      cita: {},
      medico: {},
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
        const { data: cita } = await axios.get(
          `${api_url}/api/cita/${this.props.match.params.citaId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
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
        const { data: medico } = await axios.get(
          `${api_url}/api/medicos_usuario/${cita.data.medico_id}`,
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
          cita: cita.data,
          especialidades: especialidadesDropdown(especialidades.data),
          medico: medico.data[0],
          loading: false,
        });
        trimData(this.state.cita);
        trimData(this.state.medico);
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
        [e.target.name]: e.target.value,
        updated_at: new Date(),
      },
    });
  };

  //guardar cita
  onClickButtonSaveCita = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    trimData(this.state.cita);
    try {
      const { data: cita } = await axios.put(
        `${api_url}/api/cita/${this.props.match.params.citaId}`,
        this.state.cita,
        {
          method: 'PUT',
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
            `El ${this.state.cita.fecha} a las ${this.state.cita.hora} ya existe una cita agendada para el paciente ${cita.data.pacientes.apellido} ${cita.data.pacientes.nombre}`,
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
          <Navbar buttonDisable={false} />

          {!this.state.sesion && (
            <Agregar
              id="formAgregar"
              paciente={this.state.paciente}
              onClickButtonSaveCita={this.onClickButtonSaveCita}
              horaActual={horasMinutos(this.state.cita.hora)}
              formCita={this.state.cita}
              handleChange={this.handleChange}
              horas={horasMinutos(8, 20)}
              handleOnChangeHora={this.handleOnChangeHora}
              especialidades={this.state.especialidades}
              handleOnChangeEspecialidad={this.handleOnChangeEspecialidad}
              medicos={this.state.medicos}
              handleOnChangeMedico={this.handleOnChangeMedico}
              medico={this.state.medico}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitasEditar);
