import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Agregar from '../../components/Evolucion/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,

  // cie10Dropdown,
  cie10DropdownSub,
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
      loading: false,

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
        createdAt: new Date(),
      },
      evolucionId: null,
      fotoList: [{ foto_url: '' }],

      cie10List: [],
      sesion: false,
      allCie10: [],
      cie10Show: [],
      codigo: '',
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
      const { data } = await axios.get(
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
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
        this.setState({
          paciente: data.data,
          loading: false,
        });
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
      evolucion: {
        ...this.state.evolucion,
        historia_clinica_id: this.props.match.params.historiaId,
        motivo_consulta: this.state.evolucion.motivo_consulta,
        fecha_ultima_menstruacion:
          this.state.evolucion.fecha_ultima_menstruacion,
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
        this.state.evolucion,
        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );

      if (evolucion.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
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
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //obtener datos de dropdown
  handleOnChangeCie10 = (e, data) => {
    this.setState({
      cie10List: data.value,
    });
  };

  //setear los datos del formulario de evolucion
  handleChangeCodigo = async (e) => {
    this.setState({
      codigo: e.target.value,
      loadingDrop: true,
    });
    let a = e.target.value === '' ? 'A' : e.target.value;
    try {
      const { data: cie10Sub } = await axios.get(
        `${api_url}/api/cie10_sub/${a}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (cie10Sub.error) {
        this.setState({
          sesion: true,
        });
      } else {
        this.setState({
          allCie10: cie10DropdownSub(cie10Sub.data),
          loadingDrop: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //eliminar de codigos seleccionados
  checkSelected = (e, value) => {
    if (this.state.cie10List) {
      let val = this.state.cie10List.findIndex(() => value);
      if (val > -1) {
        this.state.cie10List.splice(val, 1);
        this.setState({
          cie10List: this.state.cie10List,
          allCie10: [],
          codigo: '',
        });
      }
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
              headerC="Nueva Evolución"
              icon="add circle"
              id="formAgregar"
              paciente={this.state.paciente}
              cie10={this.state.allCie10}
              onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
              handleOnChangeCie10={this.handleOnChangeCie10}
              formEvolucion={this.state.evolucion}
              handleChange={this.handleChange}
              handleAddClick={this.addFoto}
              handleRemoveClick={this.removeFoto}
              fotosList={this.state.fotoList}
              handleChangeCodigo={this.handleChangeCodigo}
              cie10List={this.state.cie10List}
              checkSelected={this.checkSelected}
              codigo={this.state.codigo}
              loadingDrop={this.state.loadingDrop}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionAgregar);
