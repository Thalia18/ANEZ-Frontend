export function validateLetters(value) {
  let error;
  if (!/^[a-zA-Z\s]*$/i.test(value)) {
    // error = 'Campo requerido';
    // !/^[a-zA-Z\s]*$/i.test(value);
    error = 'Ingrese solo letras';
  }
  // else if (!/^[a-zA-Z\s]*$/i.test(value)) {
  //   // error = 'Ingrese solo números';
  // }
  return error;
}
