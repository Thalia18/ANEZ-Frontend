import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Agregar from '../../components/Evolucion/Agregar/Agregar';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Paciente/Agregar/NavbarAgregar';
import { api_url, openNotification, trimData } from '../../components/utils';
import { cie10Dropdown, mapStateToProps } from '../../components/utils';

class EvolucionAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: null,
      loading: true,
      paciente: {},
      evolucion: {
        historia_clinica_id: null,
        fecha: new Date(),
        motivo_consulta: '',
        fecha_ultima_menstruacion: undefined,
        procedimiento: '',
        diagnostico: '',
        medicacion: '',
        indicacion: '',
        proximo_control: undefined,
        created_at: new Date(),
      },
      fotos: {
        evolucion_id: null,
        foto_url: '',
      },
      evolucionId: null,
      fotoList: [{ foto_url: '' }],
      buttonDisable: false,
      categoriaEvolucion: {},
      cie10: [],
      cie10List: [],
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
        `${api_url}/api/paciente/${this.props.match.params.pacienteId}`
      );

      const { data: cie10List } = await axios.get(`${api_url}/api/categorias`);
      this.setState({
        paciente: data.data,
        cie10: cie10Dropdown(cie10List.data),
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
      const evolucion = await axios.post(
        `${api_url}/api/evolucion`,
        this.state.evolucion
      );

      this.setState({
        loading: false,
        success: true,
        evolucionId: evolucion.data.data.evolucion_id,
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

      //almacenar datos de cie10
      if (this.state.cie10List.length > 0) {
        for (const element of this.state.cie10List) {
          this.setState({
            categoriaEvolucion: {
              ...this.state.categoriaEvolucion,
              categoria_id: element,
              evolucion_id: this.state.evolucionId,
              created_at: new Date(),
              update_at: null,
            },
          });
          await axios.post(
            `${api_url}/api/categoria_evolucion`,
            this.state.categoriaEvolucion
          );
        }
      }
      openNotification(
        'success',
        'Evoluciones',
        'Evolución guardada exitosamente',
        ''
      );
      this.props.history.push(
        `/historia_clinica/${this.state.paciente.paciente_id}`
      );
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  //obtener datos de dropdown
  handleOnChangeCie10 = (e, data) => {
    this.state.cie10List = data.value;
  };

  render() {
    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout activeKeyP='2'>
          <Navbar buttonDisable={this.state.buttonDisable} />

          <Agregar
            id='formAgregar'
            paciente={this.state.paciente}
            cie10={this.state.cie10}
            onClickButtonSaveEvolucion={this.onClickButtonSaveEvolucion}
            handleOnChangeCie10={this.handleOnChangeCie10}
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
