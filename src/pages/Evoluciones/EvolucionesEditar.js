import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Editar from '../../components/Evolucion/Editar/Editar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Editar/NavbarEditar';
import { api_url, openNotification, trimData } from '../../components/utils';
import { mapStateToProps } from '../../components/utils';

class EvolucionAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      evolucion: {},
      fotos: {
        evolucion_id: null,
        foto_url: '',
      },
      evolucionId: null,
      fotoList: [{ foto_url: '' }],
      buttonDisable: false,
      fotoExists: {},
      fotosUpdate: [{ foto_url: '' }],
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
      const { data: paciente } = await axios.get(
        `${api_url}/api/paciente_historia/${this.props.match.params.historiaId}`
      );
      const { data: evolucion } = await axios.get(
        `${api_url}/api/evolucion/${this.props.match.params.evolucionId}`
      );
      const { data: fotos } = await axios.get(
        `${api_url}/api/fotos_evolucion/${this.props.match.params.evolucionId}`
      );
      const { data: fotosP } = await axios.get(
        `${api_url}/api/fotos_evolucion_p/${this.props.match.params.evolucionId}`
      );

      this.setState({
        paciente: paciente.data.pacientes,
        evolucion: evolucion.data,
        fotoList: fotosP.data,
        fotoExists: fotos.data,
        loading: false,
      });
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
        fecha_ultima_menstruacion: this.state.evolucion
          .fecha_ultima_menstruacion,
        procedimiento: this.state.evolucion.procedimiento,
        diagnostico: this.state.evolucion.diagnostico,
        medicacion: this.state.evolucion.medicacion,
        indicacion: this.state.evolucion.indicacion,
        proximo_control: this.state.evolucion.proximo_control,
        [e.target.name]: e.target.value,
        updated_at: new Date(),
      },
    });
  };

  //guardar historia clinica
  onClickButtonSaveEvolucion = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      error: null,
    });
    trimData(this.state.evolucion);
    try {
      this.deleteImages(this.state.fotoExists);

      await axios.put(
        `${api_url}/api/evolucion/${this.state.evolucion.evolucion_id}`,
        this.state.evolucion
      );

      this.setState({
        loading: false,
        success: true,
        evolucionId: this.state.evolucion.evolucion_id,
        error: null,
      });
      //comprueba si existen fotos y las guarda
      if (this.state.fotoList.length > 0) {
        if (this.state.fotoList[0].foto_url !== '') {
          for (const element of this.state.fotoList) {
            this.setState({
              fotos: {
                ...this.state.fotos,
                evolucion_id: this.state.evolucionId,
                foto_url: element.foto_url,
                created_at: new Date(),
                update_at: null,
              },
            });
            await axios.post(`${api_url}/api/foto`, this.state.fotos);
          }
        }
      }
      openNotification(
        'success',
        'Evoluciones',
        'Evolución guardada exitosamente',
        ''
      );
      this.props.history.push(
        `/evolucion/${this.props.match.params.evolucionId}/${this.props.match.params.historiaId}`
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  //borra las imagenes para la edicion
  deleteImages = async (list) => {
    try {
      for (const element of list) {
        await axios.delete(`${api_url}/api/foto/${element.foto_id}`);
      }
      this.setState({
        loading: false,
        success: true,
        error: null,
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
        <Layout activeKeyP='2'>
          <Navbar />

          <Editar
            paciente={this.state.paciente}
            onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
            formEvolucion={this.state.evolucion}
            handleChange={this.handleChange}
            handleAddClick={this.addFoto}
            handleRemoveClick={this.removeFoto}
            handleInputChange={this.handleChangeFoto}
            fotosList={this.state.fotoList}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(EvolucionAgregar);
