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
    consultorio: state.consultorio,
    especialidad: state.especialidad,
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

//const para medium scroll
export const mediumScroll = {
  height: '23em',
  overflowY: 'auto ::-webkit-scrollbar {display:none;}',
  overflowX: 'hidden',
};

//const para mas de medium scroll
export const maxMediumScroll = {
  height: '41em',
  overflowY: 'auto',
  overflowX: 'hidden',
};

//const para medium height
export const mediumHeight = { height: '40em' };

//const para mas de medium height
export const masMediumHeight = { height: '60em' };

//const para medium scroll
export const mediumHeightScroll = {
  height: '45em',
  overflowY: 'auto ::-webkit-scrollbar {display:none;}',
  overflowX: 'hidden',
};

//const para saltos de linea
export const saltos = {
  whiteSpace: 'pre-wrap',
  textAlign: 'justify',
};

//eliminar tildes de Receta
export const eliminarTildes = (texto) => {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
};

//para cie10
export const cie10Dropdown = (categorias) => {
  let opcion = [];
  if (categorias) {
    Object.values(categorias).map((item) => {
      opcion.push({
        key: item.categoria_id,
        text:
          item.codigo.trim() + ' ➜ ' + item.descripcion.trim().toUpperCase(),
        value: item.categoria_id,
      });
    });
  }
  return opcion;
};

//crear arreglo para calendario de citas
export const citasList = (citas) => {
  let opcion = [];
  if (citas) {
    Object.values(citas).map((item) => {
      var fecha = new Date(item.fecha);

      var hora = item.hora.split(':');
      var month = fecha.getUTCMonth();
      var day = fecha.getUTCDate();
      var year = fecha.getUTCFullYear();
      var seconds = hora[2];
      var minutes = hora[1];
      var hour = hora[0];
      opcion.push({
        cita_id: item.cita_id,
        title:
          item.pacientes.nombre.trim() + ' ' + item.pacientes.apellido.trim(),
        start: new Date(year, month, day, hour, minutes, seconds),
        end: new Date(year, month, day, hour, minutes, seconds),
      });
    });
  }
  return opcion;
};

//fechas con formato
export const fechaFormato = (fecha) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  let a = new Date(fecha.replace(/-/g, '/'));
  return a.toLocaleDateString('es-ES', options).toUpperCase();
};

//only letters
export const letters = (value) => {
  if (value !== undefined) {
    var newValue = value.replaceAll(/[^a-zA-Z​\s]+/g, '');
    return newValue;
  }
};

//fecha actual
export const fechaActual = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
};
