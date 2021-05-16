import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Detalle from '../../../components/Admin/Consultorios/Detalle';
import Navbar from '../../../components/Admin/Usuarios/NavbarDetalle';
import Error from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Loader from '../../../components/Loader/Loader';
import ModalEliminar from '../../../components/Modales/ModalEliminar';
import Sesion from '../../../components/Modales/ModalSesionExpirada';
import { api_url, mapStateToProps } from '../../../components/utils';

class ConsultorioDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      consultorio: {},
      sesion: false,
    };
  }
  componentDidMount() {
    if (
      this.props.user != null &&
      this.props.user.isLoggedIn &&
      this.props.user.rol.trim().toUpperCase() === 'ADMINISTRADOR'
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
        `${api_url}/api/consultorio/${this.props.match.params.consultorioId}`,
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
          consultorio: data.data,
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

  deleteData = async () => {
    try {
      const { data: consultorio } = await axios.delete(
        `${api_url}/api/consultorio/${this.props.match.params.consultorioId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: this.props.jwt.refreshToken,
            auth: this.props.user.rol,
          },
        }
      );
      if (consultorio.error) {
        this.setState({
          sesion: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
        this.props.history.push('/admin/consultorios');
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  closeModal = () => {
    this.setState({
      open: false,
    });
  };
  onClickDelete = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <React.Fragment>
        <Layout activeKeyP="5">
          <Navbar
            onClickDelete={this.onClickDelete}
            consultorioId={this.props.match.params.consultorioId}
            tipo="consultorio"
          />
          {!this.state.sesion && (
            <Detalle consultorio={this.state.consultorio} />
          )}

          <ModalEliminar
            deleteM={this.deleteData}
            open={this.state.open}
            closeModal={this.closeModal}
            content="¿Desea continuar?"
            headerC="Eliminar Consultorio"
          />
          <Sesion open={this.state.sesion} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(ConsultorioDetalle);
