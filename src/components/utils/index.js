import { Notification } from 'rsuite';

//utilizar globalmente para la conexion con la api
// export const api_url = 'http://localhost:3300' || process.env.API_URL;
export const api_url =
  'http://ec2-18-216-31-109.us-east-2.compute.amazonaws.com' ||
  process.env.API_URL;

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
    categorias: state.categorias,
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
    duration: 5000,
    description: (
      <div style={{ width: 320 }} rows={4}>
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
        value: (
          item.categoria_id +
          '$' +
          item.codigo.trim() +
          ' ➜ ' +
          item.descripcion.trim().toUpperCase()
        ).toString(),
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

//only numbers
export const numbers = (value) => {
  if (value !== undefined) {
    // var newValue = value.replaceAll(/[^0-9{1,9}\-0-9]+/g, '');
    var newValue = value.match(/[0-9{9,10}\-0-9{1,3}]/gs);
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

//para llenar horas y minutos
export const horasMinutos = (inicio, fin) => {
  let opcion = [];
  for (let i = inicio; i <= fin; i++) {
    for (let j = 0; j <= 45; j++) {
      var horas = i < 10 ? +'0' + i.toString() : i.toString();
      var minutos = j == 0 || j == 5 ? '0' + j.toString() : j.toString();
      var hora = horas + ':' + minutos;
      opcion.push({
        key: hora,
        text: hora,
        value: hora,
      });
      j += 14;
    }
  }
  return opcion;
};

//mostrar la hora
export const horaShow = (hora) => {
  var horaF = hora.split(':');
  var minutes = horaF[1];
  var hour = horaF[0];

  return hour + ':' + minutes;
};

//validar correos
export var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;

//enviar fecha para buscar por mes
export const fechaCitas = (fecha) => {
  var fechaN = fecha === '' ? new Date() : fecha;
  var fechaF = new Date(fechaN.getFullYear(), fechaN.getMonth() + 1, 0);

  var month = fechaF.getUTCMonth() + 1;
  var day = fechaF.getUTCDate();
  var year = fechaF.getUTCFullYear();
  return year + '-' + month + '-' + day;
};

//saveCIE10 JSON
export const saveCIE10 = (lista) => {
  let opcion = [];
  if (lista !== undefined) {
    lista.map((item) => {
      var a2 = item;
      // a2.split(' $ ', 2);
      opcion.push({
        id: parseInt(a2.substr(0, a2.lastIndexOf('$'))),
        value: a2.substr(a2.lastIndexOf('$') + 1, a2.length).replace('$', ''),
      });
    });
  }
  return opcion;
};

//save fotos JSON
export const saveFotos = (lista) => {
  let opcion = [];
  if (lista !== undefined) {
    lista.map((item, i) => {
      opcion.push({
        id: parseInt(i),
        value: item.foto_url,
      });
    });
  }
  return opcion;
};
