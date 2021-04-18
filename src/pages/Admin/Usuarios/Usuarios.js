import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../components/Layout/Layout';
import Listado from '../../../components/Admin/Usuarios/Listado';
import { api_url, mapStateToProps } from '../../../components/utils';

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuarios: {},
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
      const { data } = await axios.get(
        `${api_url}/api/usuarios?page=${this.state.page}`
      );

      this.setState({
        usuarios: data.data,
        paginas: data.info,
        loading: false,
      });
    } catch (error) {
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
        <Layout activeKeyP='4'>
          <Listado
            header='Usuarios'
            icon='user circle outline'
            usuarios={Object.values(this.state.usuarios)}
            paginas={this.state.paginas}
            handleChangePage={this.handleChangePage}
            user={this.props.user}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Pacientes);
