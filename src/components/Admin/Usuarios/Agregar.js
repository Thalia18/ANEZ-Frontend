import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  fechaActual,
  GLOBAL_MEDIA_QUERIES,
  letters,
  masMediumHeight,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils';

const Agregar = ({
  handleChange,
  roles,
  consultorios,
  especialidades,
  formUsuario,
  handleOnChangeEspecialidad,
  usuariopass,
  onClickButtonSaveUsuario,
  especialidadesSelect,
  rol_id,
  headerC,
  icon,
}) => {
  const [rol, setRol] = React.useState(rol_id);

  // var a = formCita.hora.split(':');

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name={icon} /> {headerC}
            </Header.Content>
          </Header>
          <hr />

          <DivScroll style={mediumScrollExtra}>
            <Form
              size={matches.medium ? 'tiny' : null}
              onSubmit={onClickButtonSaveUsuario}
              id="formAgregar"
            >
              <Segment basic>
                <Icon name="id card" />
                <b>Datos personales</b> <br />
                <br />
                <Form.Group>
                  <Form.Input
                    label="Nombres"
                    placeholder="Nombres"
                    width={6}
                    onChange={handleChange}
                    name="nombre"
                    value={letters(formUsuario.nombre)}
                    minLength={2}
                    required
                  />
                  <Form.Input
                    label="Apellidos"
                    placeholder="Apellidos"
                    width={6}
                    onChange={handleChange}
                    name="apellido"
                    value={letters(formUsuario.apellido)}
                    minLength={2}
                    required
                  />

                  <Form.Input
                    label="Cédula"
                    placeholder="Cédula"
                    width={5}
                    required
                  >
                    <InputMask
                      mask="9999999999"
                      onChange={handleChange}
                      name="cedula"
                      value={formUsuario.cedula}
                      pattern=".{10}"
                      maskChar={null}
                      required
                    />
                  </Form.Input>
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Fecha de nacimiento"
                    placeholder="Fecha de nacimiento"
                    width={8}
                    type="date"
                    onChange={handleChange}
                    name="fecha_nacimiento"
                    value={formUsuario.fecha_nacimiento}
                    min={'1921-01-01'}
                    max={fechaActual()}
                    required
                  />

                  <Form.Input
                    label="Teléfono"
                    placeholder="Teléfono"
                    width={8}
                    required
                  >
                    <InputMask
                      mask="999999999999999"
                      onChange={handleChange}
                      maskChar={null}
                      name="telefono"
                      value={formUsuario.telefono}
                      required
                    />
                  </Form.Input>
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Correo electrónico"
                    placeholder="Correo electrónico"
                    width={16}
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={formUsuario.email}
                    required
                  />
                </Form.Group>
              </Segment>
              <Segment basic>
                <Icon name="add user" />
                <b>Usuario</b>
              </Segment>
              {!usuariopass && (
                <Form.Input
                  label="Usuario"
                  placeholder="Usuario"
                  width={16}
                  type="usuario"
                  onChange={handleChange}
                  name="usuario"
                  value={formUsuario.usuario}
                  readOnly
                />
              )}
              <Form.Group>
                <Form.Select
                  label="Consultorio"
                  placeholder="Consultorio"
                  options={consultorios}
                  width={8}
                  name="consultorio_id"
                  onChange={(e, data) => {
                    formUsuario.consultorio_id = data.value;
                  }}
                  defaultValue={formUsuario.consultorio_id}
                  required
                />
                <Form.Select
                  label="Rol"
                  placeholder="Rol"
                  options={roles}
                  width={8}
                  name="rol_id"
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
                    label="Especialidades"
                    placeholder="Especialidades"
                    options={especialidades}
                    width={16}
                    rows={5}
                    name="especialidad_id"
                    onChange={handleOnChangeEspecialidad}
                    defaultValue={especialidadesSelect}
                    required
                  />
                </Form.Group>
              )}

              {usuariopass && (
                <Form.Group>
                  <Form.Input
                    label="Usuario"
                    placeholder="Usuario"
                    width={8}
                    type="usuario"
                    onChange={handleChange}
                    name="usuario"
                    value={formUsuario.usuario}
                    readOnly
                  />
                  <Form.Input
                    label="Contraseña"
                    placeholder="Contraseña"
                    width={8}
                    type="password"
                    onChange={handleChange}
                    name="contrasena"
                    value={formUsuario.contrasena}
                    readOnly
                  />
                </Form.Group>
              )}
            </Form>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
