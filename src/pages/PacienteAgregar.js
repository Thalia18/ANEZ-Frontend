import axios from 'axios';
import React, { Component } from 'react';

import Layout from '../components/Layout/Layout';
import Agregar from '../components/Paciente/Agregar';
import Navbar from '../components/Paciente/Navbar';
import { api_url } from '../components/utils';

class PacienteAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      paciente: {},
      etnias: {},
      tipoDeSangre: {},
      estadoCivil: {},
      nivelDeInstruccion: {},
      optionEC: [],
      a: true,
    };
  }
  componentDidMount() {
    if (this.state.a) {
      this.fetchData();
      this.estadoCivilA();
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
      const { etnias } = await axios.get(`${api_url}/api/etnias`);
      const { estadosCiviles } = await axios.get(
        `${api_url}/api/estados_civiles`
      );
      const { tiposDeSangre } = await axios.get(
        `${api_url}/api/tipos_de_sangre`
      );
      const { nivelesDeInstruccion } = await axios.get(
        `${api_url}/api/niveles_de_instruccion`
      );
      this.setState({
        etnias: etnias.etnias,
        estadoCivil: estadosCiviles.estadosCiviles,
        tipoDeSangre: tiposDeSangre.tiposDeSangre,
        nivelDeInstruccion: nivelesDeInstruccion.nivelesDeInstruccion,

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
  estadoCivilA = () => {
    const a = [];
    const b = Object.values(this.state.estadoCivil);
    b.map((item) => {
      a.push({
        key: item.estado_civil_id,
        text: item.estado_civil,
        value: item.estado_civil_id,
      });
      console.log('a', a);
      this.setState({
        optionEC: a,
      });
    });
  };
  render() {
    // console.log(this.state.optionEC);
    // console.log(Object.values(this.state.estadoCivil));
    console.log(typeof Object.values(this.state.estadoCivil));
    console.log(typeof this.state.estadoCivil, 'a');
    Object.values(this.state.estadoCivil).map((item) => {
      console.log(item);
      console.log(item.estado_civil_id);
    });

    if (this.state.loading) return <div>loading</div>;
    if (this.state.error) return <div>error</div>;
    return (
      <React.Fragment>
        <Layout>
          <Navbar />
          <Agregar
            etnias={this.state.etnias}
            nivelDeInstruccion={this.state.nivelDeInstruccion}
            estadoCivil={Object.values(this.state.estadoCivil)}
            tipoDeSangre={this.state.tipoDeSangre}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default PacienteAgregar;
