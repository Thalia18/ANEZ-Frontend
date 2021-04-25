import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editar from '../../components/HistoriaClinica/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Editar/NavbarEditar';
import {
  api_url,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../components/utils';

class HCEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      loading: true,
      paciente: {},
      historiaClinica: {},
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      (this.props.user.rol.trim().toUpperCase() === 'MÉDICO' ||
        this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR')
    ) {
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
      const { data: historia } = await axios.get(
        `${api_url}/api/historia_clinica/${this.props.match.params.historiaId}`
      );

      this.setState({
        paciente: pacienteA.data,
        historiaClinica: historia.data,
        loading: false,
      });
      trimData(this.state.paciente);
      trimData(this.state.historiaClinica);
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
      historiaClinica: {
        ...this.state.historiaClinica,
        paciente_id: this.props.match.params.pacienteId,
        antecedente_patologico_personal: this.state.historiaClinica
          .antecedente_patologico_personal,
        antecedente_quirurgico: this.state.historiaClinica
          .antecedente_quirurgico,
        alergia: this.state.historiaClinica.alergia,
        gesta: this.state.historiaClinica.gesta,
        parto: this.state.historiaClinica.parto,
        cesarea: this.state.historiaClinica.cesarea,
        aborto: this.state.historiaClinica.aborto,
        metodo_anticonceptivo: this.state.historiaClinica.metodo_anticonceptivo,
        [e.target.name]: e.target.value,
        updated_at: new Date(),
      },
    });
  };

  //guardar historia clinica
  onClickButtonSaveHC = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    trimData(this.state.historiaClinica);
    try {
      await axios.put(
        `${api_url}/api/historia_clinica/${this.props.match.params.historiaId}`,
        this.state.historiaClinica
      );
      this.setState({
        loading: false,
        success: true,
        error: null,
      });
      openNotification(
        'success',
        'Historias clínicas',
        'Historia clínica editada exitosamente',
        ''
      );
      this.props.history.push(
        `/historia_clinica/${this.state.paciente.paciente_id}`
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;

    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <Navbar success={this.state.success} />
          <Editar
            headerC="Editar Historia Clínica"
            icon="edit"
            id="formEditar"
            existsHC={false}
            onClickButtonSaveHC={this.onClickButtonSaveHC}
            handleChange={this.handleChange}
            formHC={this.state.historiaClinica}
            paciente={this.state.paciente}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(HCEditar);
