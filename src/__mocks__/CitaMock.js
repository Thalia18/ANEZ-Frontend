export const CitaMock = {
  cita_id: 1,
  medico_id: 1,
  paciente_id: 1,
  fecha: '2021-04-10',
  hora: '15:00',
  telefono_paciente: '22228999',
  motivo_cita: 'consulta medica',
};

export const CitasMock = [
  {
    cita_id: 1,
    medico_id: 1,
    paciente_id: 1,
    fecha: '2021-04-10',
    hora: '15:00',
    telefono_paciente: '22228999',
    motivo_cita: 'consulta medica',
    pacientes: {
      paciente_id: 1,
      nombre: 'Thalia',
      apellido: 'Zapata',
      cedula: '1234',
    },
  },
];
