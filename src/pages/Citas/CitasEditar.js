import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Agregar from '../../components/Cita/Editar/Editar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader';
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
      const { data } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );
      const { data: cita } = await axios.get(
        `${api_url}/api/cita/${this.props.match.params.citaId}`
      );
      const { data: especialidades } = await axios.get(
        `${api_url}/api/especialidades`
      );
      const { data: medico } = await axios.get(
        `${api_url}/api/medicos_usuario/${cita.data.medico_id}`
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
        this.state.cita
      );

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
        // this.props.history.push(
        //   `/cita_editar/${cita.paciente_id}/${cita.cita_id}`
        // );
      } else {
        openNotification('success', 'Citas', 'Cita agendada exitosamente', '');
        this.props.history.push(`/citas/${fechaCitas(new Date())}/month`);
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
        `${api_url}/api/medicos_especialidades/${data.value}`
      );
      this.setState({
        medicos: especialidadesDoctoresDropdown(medicos.data),
      });
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
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP="1">
          <Navbar buttonDisable={false} />

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
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitasEditar);
