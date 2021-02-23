import { Notification } from 'rsuite';

//utilizar globalmente para la conexion con la api
export const api_url = 'http://localhost:3300' || process.env.API_URL;

//para el componenete Media - responsive design
export const GLOBAL_MEDIA_QUERIES = {
  small: '(max-width: 599px)',
  medium: '(min-width: 600px) and (max-width: 1199px)',
  large: '(min-width: 1200px)',
};

//uso de redux para saber si esta loggeado
export const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

//uso de redux para autocomplete
export const mapStateToPropsPacientes = (state) => {
  return {
    autocomplete: state.autocomplete,
  };
};

//funciones para cargar datos de estado civil, etnias, tipos de sangre y niveles de instruccion
export const estadoCivilDropdown = (estadoCivilList) => {
  let opcion = [];
  Object.values(estadoCivilList).map((item) => {
    opcion.push({
      key: item.estado_civil_id,
      text: item.estado_civil.trim().toUpperCase(),
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
      text: item.nivel_de_instruccion.trim().toUpperCase(),
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
      text: item.etnia.trim().toUpperCase(),
      value: item.etnia_id,
    });
  });
  return opcion;
};

//mayuscula primera letra y quitar espacios
export const trimData = (obj) => {
  Object.keys(obj).map(
    (k) =>
      (obj[k] =
        typeof obj[k] == 'string' ? obj[k].trim().toUpperCase() : obj[k])
  );
};

// export const trimData = (obj) => {
//   Object.keys(obj).map(
//     (k) =>
//       (obj[k] =
//         typeof obj[k] == 'string'
//           ? obj[k]
//               .trim()
//               .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
//           : obj[k])
//   );
// };

//unicamente quitar los espacios
export const onlyTrimData = (obj) => {
  Object.keys(obj).map(
    (k) => (obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k])
  );
};

//calcular edad
export const calculaEdad = (fecha_nacimiento) => {
  var hoy = new Date();
  var nacimiento = new Date(fecha_nacimiento);
  const tiempo = hoy.getTime() - nacimiento.getTime();
  const tiempodias = tiempo / 1000 / 60 / 60 / 24;
  const tiempoyear = Math.floor(tiempodias / 365.25);
  const tiempomeses = Math.floor((tiempodias - tiempoyear * 365.25) / 31);
  const dias = Math.floor(tiempodias - tiempoyear * 365.25 - tiempomeses * 31);
  const edad =
    tiempoyear + ' AÑOS ' + tiempomeses + ' MESES ' + dias + ' DÍAS ';
  return edad;
};

//color usado para navbar y fondo de app
export const colorBackground = { background: 'rgba(0,161,213, 0.1)' };

//notificacion de success
export const openNotification = (funcName, header, content, span) => {
  Notification[funcName]({
    title: header,
    duration: 4000,
    description: (
      <div style={{ width: 320 }} rows={3}>
        {content}
        <b>{span}</b>
      </div>
    ),
  });
};
