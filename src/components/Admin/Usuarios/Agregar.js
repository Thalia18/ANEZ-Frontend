import _ from 'lodash';
import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import { Checkbox, Form, Header, Icon, Message, Segment } from 'semantic-ui-react';

import { DivScroll, Global } from '../../../global';
import { fechaActual, GLOBAL_MEDIA_QUERIES, letters, masMediumHeight, maxMediumScroll, mediumHeight, mediumScroll } from '../../utils';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  handleChange,
  id,
  roles,
  consultorios,
  especialidades,
  formUsuario,
  handleOnChangeEspecialidad,
  usuariopass,
  onClickButtonSaveUsuario,
  emailCorrect,
  especialidadesSelect,
  rol_id,
}) => {
  const [value, setValue] = React.useState('Cédula');
  const [rol, setRol] = React.useState(rol_id);

  // var a = formCita.hora.split(':');
  const handleChangeCheck = (e, { value }) => {
    setValue(value);
    if (value === 'RUC') {
      setMask('9999999999-001');
      setPattern('.{14}');
    }
    if (value === 'Cédula') {
      setMask('9999999999');
      setPattern('.{10}');
    }
  };
  const [mask, setMask] = React.useState('9999999999');
  const [pattern, setPattern] = React.useState('.{10}');

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Nuevo Usuario
              </Header.Content>
            </Header>
            <hr />

            <Message
              hidden={!emailCorrect}
              error
              header='Correo electrónico no válido'
            />
            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveUsuario}
                id={id}
              >
                <Segment basic>
                  <Icon name='id card' />
                  <b>Datos personales</b> <br />
                  <br />
                  <Form.Group>
                    <Form.Input
                      label='Nombres'
                      placeholder='Nombres'
                      width={6}
                      onChange={handleChange}
                      name='nombre'
                      value={letters(formUsuario.nombre)}
                      minLength={2}
                      required
                    />
                    <Form.Input
                      label='Apellidos'
                      placeholder='Apellidos'
                      width={6}
                      onChange={handleChange}
                      name='apellido'
                      value={letters(formUsuario.apellido)}
                      minLength={2}
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
                        value={formUsuario.cedula}
                        pattern={pattern}
                        maskChar={null}
                        required
                      />
                    </Form.Input>
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      label='Fecha de nacimiento'
                      placeholder='Fecha de nacimiento'
                      width={8}
                      type='date'
                      onChange={handleChange}
                      name='fecha_nacimiento'
                      value={formUsuario.fecha_nacimiento}
                      min={'1921-01-01'}
                      max={fechaActual()}
                      required
                    />

                    <Form.Input
                      label='Teléfono'
                      placeholder='Teléfono'
                      width={8}
                      required
                    >
                      <InputMask
                        mask='999999999999999'
                        onChange={handleChange}
                        maskChar={null}
                        name='telefono'
                        value={formUsuario.telefono}
                        required
                      />
                    </Form.Input>
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      label='Correo electrónico'
                      placeholder='Correo electrónico'
                      width={16}
                      type='email'
                      onChange={handleChange}
                      name='email'
                      value={formUsuario.email}
                      required
                    />
                  </Form.Group>
                </Segment>
                <Segment basic>
                  <Icon name='add user' />
                  <b>Usuario</b>
                </Segment>
                {!usuariopass && (
                  <Form.Input
                    label='Usuario'
                    placeholder='Usuario'
                    width={16}
                    type='usuario'
                    onChange={handleChange}
                    name='usuario'
                    value={formUsuario.usuario}
                    readOnly
                  />
                )}
                <Form.Group>
                  <Form.Select
                    label='Consultorio'
                    placeholder='Consultorio'
                    options={consultorios}
                    width={8}
                    name='consultorio_id'
                    onChange={(e, data) => {
                      formUsuario.consultorio_id = data.value;
                    }}
                    defaultValue={formUsuario.consultorio_id}
                    required
                  />
                  <Form.Select
                    label='Rol'
                    placeholder='Rol'
                    options={roles}
                    width={8}
                    name='rol_id'
                    onChange={(e, data) => {
                      setRol(data.value);
                      formUsuario.rol_id = data.value;
                    }}
                    defaultValue={formUsuario.rol_id}
                    required
                  />
                </Form.Group>
                {rol === 2 && (
                  <Form.Group>
                    <Form.Select
                      clearable
                      fluid
                      multiple
                      search
                      selection
                      label='Especialidades'
                      placeholder='Especialidades'
                      options={especialidades}
                      width={16}
                      rows={5}
                      name='especialidad_id'
                      onChange={handleOnChangeEspecialidad}
                      defaultValue={especialidadesSelect}
                      required
                    />
                  </Form.Group>
                )}

                {usuariopass && (
                  <Form.Group>
                    <Form.Input
                      label='Usuario'
                      placeholder='Usuario'
                      width={8}
                      type='usuario'
                      onChange={handleChange}
                      name='usuario'
                      value={formUsuario.usuario}
                      readOnly
                    />
                    <Form.Input
                      label='Contraseña'
                      placeholder='Contraseña'
                      width={8}
                      onChange={handleChange}
                      name='contrasena'
                      value={formUsuario.contrasena}
                      readOnly
                    />
                  </Form.Group>
                )}
              </Form>
            </DivScroll>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
