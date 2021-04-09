import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Buscar from '../../components/Citas/Buscar';
import Layout from '../../components/Layout/Layout';
import { api_url, mapStateToProps } from '../../components/utils';

class CitasBuscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      citas: {},
      citaList: [],
      paginas: {},
      page: 1,
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
        `${api_url}/api/citas_fecha/${this.props.match.params.fecha1}/${this.props.match.params.fecha2}?page=${this.state.page}`
      );

      this.setState({
        citas: citas.data,
        paginas: citas.info,
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
  handleChangePage = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='1'>
          <Buscar
            citas={this.state.citas}
            fecha1={this.props.match.params.fecha1}
            fecha2={this.props.match.params.fecha2}
            paginas={this.state.paginas}
            handleChangePage={this.handleChangePage}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(CitasBuscar);
