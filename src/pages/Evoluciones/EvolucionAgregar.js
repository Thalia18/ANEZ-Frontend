import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../components/Evolucion/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  cie10Dropdown,
  mapStateToProps,
  openNotification,
  saveCIE10,
  saveFotos,
  trimData,
} from '../../components/utils';

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
        fecha_ultima_menstruacion: undefined,
        procedimiento: '',
        diagnostico: '',
        medicacion: '',
        indicacion: '',
        proximo_control: undefined,
        foto: '',
        diagnostico_cie10: '',
        created_at: new Date(),
      },
      evolucionId: null,
      fotoList: [{ foto_url: '' }],
      buttonDisable: false,
      cie10List: [],
      cie10: [],
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
      const { data } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );

      // const { data: cie10List } = await axios.get(`${api_url}/api/categorias`);
      this.setState({
        paciente: data.data,
        // cie10: cie10Dropdown(cie10List.data),
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
      evolucion: {
        ...this.state.evolucion,
        historia_clinica_id: this.props.match.params.historiaId,
        motivo_consulta: this.state.evolucion.motivo_consulta,
        fecha_ultima_menstruacion: this.state.evolucion
          .fecha_ultima_menstruacion,
        procedimiento: this.state.evolucion.procedimiento,
        diagnostico: this.state.evolucion.diagnostico,
        medicacion: this.state.evolucion.medicacion,
        indicacion: this.state.evolucion.indicacion,
        proximo_control: this.state.evolucion.proximo_control,
        diagnostico_cie10: this.state.evolucion.diagnostico_cie10,
        foto: this.state.evolucion.foto,
        [e.target.name]: e.target.value,
      },
    });
  };

  //guardar evolucion
  onClickButtonSaveEvolucion = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    this.state.evolucion.diagnostico_cie10 = saveCIE10(this.state.cie10List);
    this.state.evolucion.foto = saveFotos(this.state.fotoList);
    this.state.evolucion.indicacion = this.state.evolucion.indicacion.substring(
      0,
      1200
    );

    this.state.evolucion.medicacion = this.state.evolucion.medicacion.substring(
      0,
      1200
    );

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
      openNotification(
        'success',
        'Evoluciones',
        'Evolución guardada exitosamente',
        ''
      );
      this.props.history.push(
        `/evoluciones/${this.props.match.params.historiaId}`
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //obtener datos de dropdown
  handleOnChangeCie10 = (e, data) => {
    this.state.cie10List = data.value;
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='2'>
          <Navbar buttonDisable={this.state.buttonDisable} />

          <Agregar
            headerC='Nueva Evolución'
            icon='add circle'
            id='formAgregar'
            paciente={this.state.paciente}
            // cie10={this.state.cie10}
            cie10={cie10Dropdown(this.props.categorias)}
            onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
            handleOnChangeCie10={this.handleOnChangeCie10}
            formEvolucion={this.state.evolucion}
            handleChange={this.handleChange}
            handleAddClick={this.addFoto}
            handleRemoveClick={this.removeFoto}
            fotosList={this.state.fotoList}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionAgregar);
