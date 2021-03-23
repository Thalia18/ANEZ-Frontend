import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../components/Cita/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import { api_url, openNotification, trimData } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class EvolucionAgregar extends Component {
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
        created_at: new Date(),
        medico_id: '',
        paciente_id: '',
      },
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
      this.setState({
        paciente: data.data,
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
      const { data: cita } = await axios.post(
        `${api_url}/api/cita`,
        this.state.cita
      );

      this.setState({
        loading: false,
        success: true,
        error: null,
      });

      if (cita.exist) {
        openNotification(
          'info',
          'Citas',
          `El ${this.state.cita.fecha} a las ${this.state.cita.hora} ya existe una cita agendada para el paciente ${this.state.paciente.apellido} ${this.state.paciente.nombre}`,
          ''
        );
      } else {
        openNotification('success', 'Citas', 'Cita agendada exitosamente', '');
      }

      this.props.history.push(`/citas`);
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  getHour = (date) => {
    var minutes = date.getMinutes();
    var hour = date.getHours();
    this.setState({
      cita: {
        ...this.state.cita,
        hora: hour + ':' + minutes + ':00',
      },
    });
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
            paciente={this.state.paciente}
            onClickButtonSaveCita={this.onClickButtonSaveCita}
            getHour={this.getHour}
            formCita={this.state.cita}
            handleChange={this.handleChange}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionAgregar);
