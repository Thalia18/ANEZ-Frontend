import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CitasCalendar from '../../components/Citas/Listado';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
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
      const { data: citas } = await axios.get(
        `${api_url}/api/citas_fecha/${this.props.match.params.fecha}`
      );
      this.setState({
        citaList: citasList(citas.data),
        loading: false,
      });
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
        window.location.href = `http://localhost:3000/citas/${fechaCitas(
          e,
          'day'
        )}/day`;
      }, 10);
    } else {
      if (view === 'day') {
        this.props.history.push(`/citas/${fechaCitas(e, view)}/${view}`);
        this.state.view = view;

        setTimeout(() => {
          window.location.href = `http://localhost:3000/citas/${this.props.match.params.fecha}/${this.props.match.params.view}`;
        }, 10);
      }
      if (view === 'month') {
        this.props.history.push(`/citas/${fechaCitas(e, view)}/${view}`);
        this.state.view = view;

        setTimeout(() => {
          window.location.href = `http://localhost:3000/citas/${this.props.match.params.fecha}/${this.props.match.params.view}`;
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
          <CitasCalendar
            citas={this.state.citaList}
            changeMonth={this.changeMonth}
            fechaUltima={new Date(this.props.match.params.fecha)}
            view={this.props.match.params.view}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Citas);
