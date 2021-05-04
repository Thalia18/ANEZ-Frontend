import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Editar from '../../components/HistoriaClinica/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExperida';
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
      sesion: false,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      this.props.user.rol.trim().toUpperCase() === 'MÉDICO'
    ) {
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
      const { data: pacienteA } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (pacienteA.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: historia } = await axios.get(
          `${api_url}/api/historia_clinica/${this.props.match.params.historiaId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          paciente: pacienteA.data,
          historiaClinica: historia.data,
          loading: false,
        });
        trimData(this.state.paciente);
        trimData(this.state.historiaClinica);
      }
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
      const { data: HC } = await axios.put(
        `${api_url}/api/historia_clinica/${this.props.match.params.historiaId}`,
        this.state.historiaClinica,
        {
          method: 'PUT',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (HC.error) {
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
        openNotification(
          'success',
          'Historias clínicas',
          'Historia clínica editada exitosamente',
          ''
        );
        this.props.history.push(
          `/historia_clinica/${this.state.paciente.paciente_id}`
        );
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="2">
          <Navbar success={this.state.success} />
          {!this.state.sesion && (
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
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(HCEditar);
