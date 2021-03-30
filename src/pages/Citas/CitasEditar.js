import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../components/Cita/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import { api_url, openNotification, trimData } from '../../components/utils';
import { horasMinutos, mapStateToProps } from '../../components/utils';

class CitasEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      cita: {},
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
      this.setState({
        paciente: data.data,
        cita: cita.data,
        loading: false,
      });
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
        medico_id: this.props.user.medico_id,
        paciente_id: this.props.match.params.pacienteId,
        [e.target.name]: e.target.value,
        updated_at: new Date(),
      },
    });
  };

  //guardar historia clinica
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
        this.props.history.push(`/citas`);
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  handleOnChangeHora = (e, data) => {
    this.state.cita.hora = data.value;
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.cita);
    return (
      <React.Fragment>
        <Layout activeKeyP='1'>
          <Navbar buttonDisable={false} />

          <Agregar
            id='formAgregar'
            paciente={this.state.paciente}
            onClickButtonSaveCita={this.onClickButtonSaveCita}
            horaActual={horasMinutos(this.state.cita.hora)}
            formCita={this.state.cita}
            handleChange={this.handleChange}
            horas={horasMinutos(8, 20)}
            handleOnChangeHora={this.handleOnChangeHora}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitasEditar);
