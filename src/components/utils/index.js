//utilizar globalmente para la conexion con la api
export const api_url = 'http://localhost:3300' || process.env.API_URL;

//para el componenete Media - responsive design
export const GLOBAL_MEDIA_QUERIES = {
  small: '(max-width: 599px)',
  medium: '(min-width: 600px) and (max-width: 1199px)',
  large: '(min-width: 1200px)',
};

//uso de redux para saber si esta logeado
export const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export const estadoCivilDropdown = (estadoCivilList) => {
  let opcion = [];
  Object.values(estadoCivilList).map((item) => {
    opcion.push({
      key: item.estado_civil_id,
      text: item.estado_civil.trim(),
      value: item.estado_civil_id,
    });
  });
  return opcion;
};
export const tipoDeSangreDropdown = (tipoDeSangreList) => {
  let opcion = [];
  Object.values(tipoDeSangreList).map((item) => {
    opcion.push({
      key: item.tipo_de_sangre_id,
      text: item.tipo_de_sangre.trim(),
      value: item.tipo_de_sangre_id,
    });
  });
  return opcion;
};
export const nivelDeInstruccionDropdown = (nivelDeInstruccionList) => {
  let opcion = [];
  Object.values(nivelDeInstruccionList).map((item) => {
    opcion.push({
      key: item.nivel_de_instruccion_id,
      text: item.nivel_de_instruccion.trim(),
      value: item.nivel_de_instruccion_id,
    });
  });
  return opcion;
};
export const etniasDropdown = (etniasList) => {
  let opcion = [];
  Object.values(etniasList).map((item) => {
    opcion.push({
      key: item.etnia_id,
      text: item.etnia.trim(),
      value: item.etnia_id,
    });
  });
  return opcion;
};
