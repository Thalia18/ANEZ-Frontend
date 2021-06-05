import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CitasN from '../../components/Citas/Notificaciones';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import {
  api_url,
  mapStateToProps,
  openNotification,
} from '../../components/utils';

class Citas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      citas: {},
      citaList: [],
      fecha: '',
      fechaBuscar: '',
      view: 'month',
      paginas: {},
      page: 1,
      sesion: false,
      seleccionadasAll: [],
      seleccionadas: [],

      opcion: [],
      opcionAll: [],
    };
  }
  componentDidMount() {
    if (this.props.user != null && this.props.user.isLoggedIn) {
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
        `${api_url}/api/citas_fechas/${this.props.match.params.fecha1}/${this.props.match.params.fecha2}?page=${this.state.page}`,
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
          citas: data.data,
          loading: false,
          paginas: data.info,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  onChangeSeleccionadas = (tipo, data) => {
    this.setState({
      seleccionadas: [],
    });
    if (tipo === 'all') {
      this.state.opcionAll.push(data);
    } else {
      let index = this.state.opcion.indexOf(data.value);
      if (data.checked && index === -1) {
        this.state.opcion.push(data.value);
      }
      if (!data.checked && index >= -1) {
        this.state.opcion.splice(index, 1);
      }
    }
    this.setState({
      seleccionadasAll: tipo === 'all' ? this.state.opcionAll : [],
      seleccionadas: tipo === 'opcion' ? this.state.opcion : [],
    });
  };
  handleChangePage = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };
  onClickSend = async (e) => {
    let citas = [];
    citas =
      this.state.opcion.length > 0
        ? this.state.opcion
        : this.state.opcionAll[0];
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
      opcion: [],
      opcionAll: [],
    });

    let data = {
      citas: citas,
      direccion: this.props.consultorio.direccion,
      telefono: this.props.consultorio.telefono,
    };
    try {
      const { data: cita } = await axios.post(
        `${api_url}/api/notificaciones`,
        data,

        {
          method: 'POST',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (cita.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          error: null,
        });
        if (cita.data) {
          openNotification(
            'success',
            'Citas',
            `Recordatorios enviados satisfactoriamente`,
            ''
          );
        }
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
        <Layout activeKeyP="1">
          {!this.state.sesion && (
            <CitasN
              citas={this.state.citas}
              paginas={this.state.paginas}
              handleChangePage={this.handleChangePage}
              seleccionadas={this.state.seleccionadas}
              onChangeSeleccionadas={this.onChangeSeleccionadas}
              onClickSend={this.onClickSend}
              header="Resultados de la búsqueda"
              icon="search"
              fecha1={this.props.match.params.fecha1}
              fecha2={this.props.match.params.fecha2}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Citas);
