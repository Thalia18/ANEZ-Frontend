import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import Editar from '../../components/Evolucion/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import {
  api_url,
  cie10DropdownSub,
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
      loadingDrop: false,
      evolucionId: null,
      fotoList: [{ foto_url: '' }],

      fotoExists: {},
      fotosUpdate: [{ foto_url: '' }],
      categoriaEvolucion: {},
      cie10: [],
      cie10List: [],

      cie10Exist: {},
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
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`,
        {
          method: 'GET',
          headers: {
            Authorization: this.props.jwt.refreshToken,
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
        const { data: evolucion } = await axios.get(
          `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`,
          {
            method: 'GET',
            headers: {
              Authorization: this.props.jwt.refreshToken,
              auth: this.props.user.rol,
            },
          }
        );
        this.setState({
          paciente: paciente.data.pacientes,
          evolucion: evolucion.data,
          fotoList: this.selectedFoto(evolucion.data.foto),
          cie10List: this.selectedCIe10(evolucion.data.diagnostico_cie10),
          loading: false,
        });
        trimData(this.state.evolucion);
        trimData(this.state.paciente);
      }
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
        updatedAt: new Date(),
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
      const { data: evolucion } = await axios.put(
        `${api_url}/api/evolucion/${this.state.evolucion.evolucion_id}`,
        this.state.evolucion,
        {
          method: 'PUT',
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
            <Editar
              headerC="Editar Evolución"
              icon="edit"
              paciente={this.state.paciente}
              cie10={this.state.allCie10}
              onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
              handleOnChangeCie10={this.handleOnChangeCie10}
              formEvolucion={this.state.evolucion}
              handleChange={this.handleChange}
              fotosList={this.state.fotoList}
              cie10List={this.state.cie10List}
              handleChangeCodigo={this.handleChangeCodigo}
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

export default connect(mapStateToProps, null)(EvolucionEditar);
