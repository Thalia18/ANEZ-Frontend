import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CitasCalendar from '../../components/Citas/Listado';
import Layout from '../../components/Layout/Layout';
import { api_url, citasList } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class Citas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      citas: {},
      citaList: [],
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
      const { data: citas } = await axios.get(`${api_url}/api/citas`);

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

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='1'>
          <CitasCalendar citas={this.state.citaList} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Citas);
