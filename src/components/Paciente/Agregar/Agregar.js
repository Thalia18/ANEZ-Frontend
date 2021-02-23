import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import {
  Checkbox,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import { Global } from '../../../global';
import { GLOBAL_MEDIA_QUERIES } from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  etnias,
  nivelDeInstruccion,
  estadoCivil,
  tipoDeSangre,
  onClickButtonSavePaciente,
  handleChange,
  formPaciente,
  handleOnChangeEC,
  handleOnChangeE,
  handleOnChangeTS,
  handleOnChangeNI,
  campos,
  fechaError,
  cedulaLength,
}) => {
  const [value, setValue] = React.useState('Cédula');
  const handleChangeCheck = (e, { value }) => {
    setValue(value);
    if (value === 'RUC') {
      setMask('9999999999-001');
    }
    if (value === 'Cédula') {
      setMask('999999999-9');
    }
  };
  const [mask, setMask] = React.useState('999999999-9');
  const letters = (value) => {
    if (value !== undefined) {
      var newValue = value.replaceAll(/[^a-zA-Z​\s]+/g, '');
      return newValue;
    }
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '37em' } : { height: '50em' }}
          >
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Nuevo Paciente
              </Header.Content>
            </Header>
            <hr />
            <Message
              hidden={!campos}
              warning
              header='Seleccione Estado Civil, Etnia, Nivel de Instrucción y Tipo de Sangre'
            />
            <Message
              hidden={!fechaError}
              error
              header='Fecha de nacimiento no válida'
            />
            <Message
              hidden={!cedulaLength}
              error
              header='Número de cédula no válido'
            />
            <Form
              size={matches.medium ? 'tiny' : null}
              onSubmit={onClickButtonSavePaciente}
              id='formAgregar'
            >
              <Form.Group>
                <Form.Input
                  label='Nombres'
                  placeholder='Nombres'
                  width={6}
                  onChange={handleChange}
                  name='nombre'
                  value={letters(formPaciente.nombre)}
                  required
                />
                <Form.Input
                  label='Apellidos'
                  placeholder='Apellidos'
                  width={5}
                  onChange={handleChange}
                  name='apellido'
                  value={letters(formPaciente.apellido)}
                  required
                />
                <Form.Field>
                  <Checkbox
                    radio
                    label='Cédula'
                    name='checkboxRadioGroup'
                    value='Cédula'
                    checked={value === 'Cédula'}
                    onChange={handleChangeCheck}
                  />
                  <Checkbox
                    radio
                    label='RUC'
                    name='checkboxRadioGroup'
                    value='RUC'
                    checked={value === 'RUC'}
                    onChange={handleChangeCheck}
                  />
                </Form.Field>

                <Form.Input
                  label={value}
                  placeholder={value}
                  width={5}
                  required
                >
                  <InputMask
                    mask={mask}
                    onChange={handleChange}
                    name='cedula'
                    value={formPaciente.cedula}
                    maskChar={null}
                    required
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Lugar de nacimiento'
                  placeholder='Lugar de nacimiento'
                  width={6}
                  onChange={handleChange}
                  name='lugar_nacimiento'
                  value={letters(formPaciente.lugar_nacimiento)}
                  required
                />
                <Form.Input
                  label='Fecha de nacimiento'
                  placeholder='Fecha de nacimiento'
                  width={4}
                  type='date'
                  onChange={handleChange}
                  name='fecha_nacimiento'
                  value={formPaciente.fecha_nacimiento}
                  required
                />

                <Form.Select
                  label='Estado civil'
                  placeholder='Estado civil'
                  options={estadoCivil}
                  width={6}
                  name='estado_civil_id'
                  onChange={handleOnChangeEC}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Select
                  label='Etnia'
                  placeholder='Etnia'
                  options={etnias}
                  width={6}
                  name='etnia_id'
                  onChange={handleOnChangeE}
                  required
                />
                <Form.Select
                  label='Nivel de instrucción'
                  placeholder='Nivel de instrucción'
                  options={nivelDeInstruccion}
                  width={6}
                  name='nivel_de_instruccion_id'
                  onChange={handleOnChangeNI}
                  required
                />
                <Form.Select
                  label='Tipo de sangre'
                  placeholder='Tipo de sangre'
                  options={tipoDeSangre}
                  width={6}
                  name='tipo_de_sangre_id'
                  onChange={handleOnChangeTS}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Dirección domicilio'
                  placeholder='Dirección domicilio'
                  width={10}
                  onChange={handleChange}
                  name='direccion'
                  value={formPaciente.direccion}
                  required
                />
                <Form.Input
                  label='Teléfono'
                  placeholder='Teléfono'
                  width={6}
                  required
                >
                  <InputMask
                    mask='999999999999999'
                    onChange={handleChange}
                    maskChar={null}
                    name='telefono'
                    value={formPaciente.telefono}
                    required
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Nombre contacto de emergencia'
                  placeholder='Nombre contacto de emergencia'
                  width={10}
                  onChange={handleChange}
                  name='contacto_emergencia_nombre'
                  value={letters(formPaciente.contacto_emergencia_nombre)}
                />
                <Form.Input
                  label='Teléfono contacto de emergencia'
                  placeholder='Teléfono contacto de emergencia'
                  width={6}
                >
                  <InputMask
                    mask='999999999999999'
                    maskChar={null}
                    onChange={handleChange}
                    name='contacto_emergencia_telefono'
                    value={formPaciente.contacto_emergencia_telefono}
                  />
                </Form.Input>
              </Form.Group>
            </Form>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
