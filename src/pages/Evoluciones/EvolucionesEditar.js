import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editar from '../../components/Evolucion/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Editar/NavbarEditar';
import {
  api_url,
  cie10Dropdown,
  mapStateToProps,
  openNotification,
  saveCIE10,
  saveFotos,
  trimData,
} from '../../components/utils';

class EvolucionEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      evolucion: {},

      evolucionId: null,
      fotoList: [{ foto_url: '' }],
      buttonDisable: false,
      fotoExists: {},
      fotosUpdate: [{ foto_url: '' }],
      categoriaEvolucion: {},
      cie10: [],
      cie10List: [],
      cie10Exist: {},
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
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );
      const { data: evolucion } = await axios.get(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );

      this.setState({
        paciente: paciente.data.pacientes,
        evolucion: evolucion.data,

        fotoList: this.selectedFoto(evolucion.data.foto),
        loading: false,
      });
      trimData(this.state.evolucion);
      trimData(this.state.paciente);
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //identificar los cie10 seleccionados
  selectedCIe10 = (lista) => {
    let opcion = [];
    if (lista) {
      lista.map((item) => {
        opcion.push(item.id + '$' + item.value);
      });
    }
    return opcion;
  };

  selectedFoto = (lista) => {
    let opcion = [];
    if (lista) {
      lista.map((item) => {
        opcion.push({ foto_url: item.value });
      });
    }
    return opcion;
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
        updated_at: new Date(),
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
      await axios.put(
        `${api_url}/api/evolucion/${this.state.evolucion.evolucion_id}`,
        this.state.evolucion
      );

      this.setState({
        loading: false,
        success: true,
        evolucionId: this.state.evolucion.evolucion_id,
        error: null,
      });

      openNotification(
        'success',
        'Evoluciones',
        'Evolución guardada exitosamente',
        ''
      );
      this.props.history.push(
        `/evolucion/${this.props.match.params.evolucionId}/${this.props.match.params.historiaId}`
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
        <Layout activeKeyP="2">
          <Navbar />

          <Editar
            headerC="Editar Evolución"
            icon="edit"
            id="formEditar"
            paciente={this.state.paciente}
            cie10={cie10Dropdown(this.props.categorias)}
            onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
            handleOnChangeCie10={this.handleOnChangeCie10}
            formEvolucion={this.state.evolucion}
            handleChange={this.handleChange}
            fotosList={this.state.fotoList}
            cie10List={this.selectedCIe10(
              this.state.evolucion.diagnostico_cie10
            )}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionEditar);
