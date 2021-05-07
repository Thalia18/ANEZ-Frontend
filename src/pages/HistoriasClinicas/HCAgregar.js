import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Agregar from '../../components/HistoriaClinica/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  mapStateToProps,
  openNotification,
  trimData,
} from '../../components/utils';

class HCAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      loading: true,
      activePage: '',
      paciente: {},
      HCporId: {},
      existHC: false,
      historiaClinica: {
        paciente_id: null,
        antecedente_patologico_personal: '',
        antecedente_quirurgico: '',
        alergia: '',
        gesta: '',
        parto: '',
        cesarea: '',
        aborto: '',
        metodo_anticonceptivo: '',
        createdAt: new Date(),
      },
      sesion: false,
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
      this.props.history.push('/error_auth');
    }
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.accessToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (paciente.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        const { data: historia } = await axios.get(
          `${api_url}/api/historia_paciente/${this.props.match.params.pacienteId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.accessToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          hCporId: historia.data,
          paciente: paciente.data,
          loading: false,
        });

        if (this.state.hCporId !== null) {
          this.setState({
            existHC: true,
          });
        }
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //setear los datos del formulario de historia clinica
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
      const { data: HC } = await axios.post(
        `${api_url}/api/historia_clinica`,
        this.state.historiaClinica,
        {
          method: 'POST',
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
          historiaClinica: {},
        });
        openNotification(
          'success',
          'Historias clínicas',
          'Historia clínica guardada exitosamente',
          ''
        );
        this.props.history.push('/historias_clinicas');
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
          <Navbar />
          {!this.state.sesion && (
            <Agregar
              headerC="Nueva Historia Clínica"
              icon="add circle"
              paciente={this.state.paciente}
              onClickButtonSaveHC={this.onClickButtonSaveHC}
              formHC={this.state.historiaClinica}
              handleChange={this.handleChange}
              existsHC={this.state.existHC}
              header="Historia clínica"
              content={`${this.state.paciente.apellido} ${this.state.paciente.nombre}`}
              pacienteId={this.state.paciente.paciente_id}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(HCAgregar);
