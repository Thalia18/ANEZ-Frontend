import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CitasCalendar from '../../components/Citas/Listado';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Sesion from '../../components/Modales/ModalSesionExpirada';
import {
  api_url,
  citasList,
  fechaCitas,
  mapStateToProps,
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
      sesion: false,
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
      const url =
        this.props.user.rol.trim().toUpperCase() === 'MÉDICO'
          ? `${api_url}/api/citas_fecha_med/${this.props.match.params.fecha}/${this.props.user.medico_id}`
          : `${api_url}/api/citas_fecha/${this.props.match.params.fecha}`;

      const { data: citas } = await axios.get(url, {
        method: 'GET',
        headers: {
          Authorization: this.props.jwt.refreshToken,
          auth: this.props.user.rol,
        },
      });
      if (citas.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          citaList: citasList(citas.data),
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

  changeMonth = (e, view, action) => {
    if (action === 'DATE') {
      // this.props.history.push(`/citas/${fechaCitas(e, 'day')}/day`);
      this.state.view = view;

      setTimeout(() => {
        window.location.href = `/citas/${fechaCitas(e, 'day')}/day`;
      }, 10);
    } else {
      if (view === 'day') {
        this.props.history.push(`/citas/${fechaCitas(e, view)}/${view}`);
        this.state.view = view;

        setTimeout(() => {
          window.location.href = `/citas/${this.props.match.params.fecha}/${this.props.match.params.view}`;
        }, 10);
      }
      if (view === 'month') {
        this.props.history.push(`/citas/${fechaCitas(e, view)}/${view}`);
        this.state.view = view;

        setTimeout(() => {
          window.location.href = `/citas/${this.props.match.params.fecha}/${this.props.match.params.view}`;
        }, 10);
      }
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <React.Fragment>
        <Layout activeKeyP="1">
          {!this.state.sesion && (
            <CitasCalendar
              citas={this.state.citaList}
              changeMonth={this.changeMonth}
              fechaUltima={new Date(this.props.match.params.fecha)}
              view={this.props.match.params.view}
              user={this.props.user}
            />
          )}
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Citas);
