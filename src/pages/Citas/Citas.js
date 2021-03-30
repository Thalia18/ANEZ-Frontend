import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CitasCalendar from '../../components/Citas/Listado';
import Layout from '../../components/Layout/Layout';
import {
  api_url,
  citasList,
  mapStateToProps,
  fechaCitas,
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

  changeMonth = (e) => {
    // this.setState({
    //   fecha: e,
    // });
    // console.log(this.state.fecha, 'fechaaaaa');
    console.log(fechaCitas(e), 'eeee');
    this.props.history.push(`/citas/${fechaCitas(e)}`);

    setTimeout(() => {
      window.location.href = `http://localhost:3000/citas/${this.props.match.params.fecha}`;
    }, 100);
  };
  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    console.log(this.state.fecha, 'fecha prin', fechaCitas(this.state.fecha));
    console.log(this.state.citaList);
    return (
      <React.Fragment>
        <Layout activeKeyP='1'>
          <CitasCalendar
            citas={this.state.citaList}
            changeMonth={this.changeMonth}
            fechaUltima={new Date(this.props.match.params.fecha)}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Citas);
