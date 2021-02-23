import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../components/Evolucion/Agregar/Agregar';
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
      evolucion: {
        historia_clinica_id: null,
        fecha: new Date(),
        motivo_consulta: '',
        fecha_ultima_menstruacion: '',
        procedimiento: '',
        diagnostico: '',
        tratamiento: '',
        proximo_control: '',
        created_at: new Date(),
      },
      fotos: {
        evolucion_id: null,
        foto_url: '',
      },
      evolucionId: null,
      fotoList: [{ foto_url: '' }],
      fechaM: false,
      fechaPC: false,
      buttonDisable: true,
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
      console.log(error);
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //setear los datos del formulario de evolucion
  handleChange = (e) => {
    this.setState({
      evolucion: {
        ...this.state.evolucion,
        historia_clinica_id: this.props.match.params.historiaId,
        motivo_consulta: this.state.evolucion.motivo_consulta,
        fecha_ultima_menstruacion: this.state.evolucion
          .fecha_ultima_menstruacion,
        procedimiento: this.state.evolucion.procedimiento,
        diagnostico: this.state.evolucion.diagnostico,
        tratamiento: this.state.evolucion.tratamiento,
        proximo_control: this.state.evolucion.proximo_control,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.evolucion);
    let hoy = new Date();

    if (
      this.state.evolucion.fecha_ultima_menstruacion !== undefined &&
      this.state.evolucion.fecha_ultima_menstruacion > hoy
    ) {
      this.setState({
        fechaM: true,
      });
    } else {
      this.setState({
        fechaM: false,
        buttonDisable: false,
      });
    }
    if (
      this.state.evolucion.proximo_control !== undefined &&
      this.state.evolucion.proximo_control < hoy
    ) {
      this.setState({
        fechaPC: true,
      });
    } else {
      this.setState({
        fechaPC: false,
        buttonDisable: false,
      });
    }
    if (this.state.evolucion.fecha_ultima_menstruacion === '') {
      this.state.evolucion.fecha_ultima_menstruacion = undefined;
    }
    if (this.state.evolucion.proximo_control === '') {
      this.state.evolucion.proximo_control = undefined;
    }
  };

  //guardar historia clinica
  onClickButtonSaveEvolucion = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    trimData(this.state.evolucion);
    try {
      const evolucion = await axios.post(
        `${api_url}/api/evolucion`,
        this.state.evolucion
      );

      this.setState({
        loading: false,
        success: true,
        evolucionId: evolucion.data.data.evolucion_id,
        error: null,
      });
      if (
        this.state.fotoList.length > 0 &&
        this.state.fotoList.foto_url !== ''
      ) {
        for (const element of this.state.fotoList) {
          this.setState({
            fotos: {
              ...this.state.fotos,
              evolucion_id: this.state.evolucionId,
              foto_url: element.foto_url,
              created_at: new Date(),
              update_at: null,
            },
          });
          await axios.post(`${api_url}/api/foto`, this.state.fotos);
        }
      }
      openNotification(
        'success',
        'Evoluciones',
        'Evolución guardada exitosamente',
        ''
      );
      this.props.history.push(
        `/historia_clinica/${this.state.paciente.paciente_id}`
      );
    } catch (error) {
      console.log(error);
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
        <Layout activeKeyP='2'>
          <Navbar buttonDisable={this.state.buttonDisable} />

          <Agregar
            paciente={this.state.paciente}
            onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
            formEvolucion={this.state.evolucion}
            handleChange={this.handleChange}
            handleAddClick={this.addFoto}
            handleRemoveClick={this.removeFoto}
            handleInputChange={this.handleChangeFoto}
            fotosList={this.state.fotoList}
            fechaM={this.state.fechaM}
            fechaPC={this.state.fechaPC}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionAgregar);
