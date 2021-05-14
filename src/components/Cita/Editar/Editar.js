import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Checkbox, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaActual,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils';

const Agregar = ({
  paciente,
  onClickButtonSaveCita,
  formCita,
  handleChange,
  horas,
  handleOnChangeHora,
  especialidades,
  handleOnChangeEspecialidad,
  medicos,
  handleOnChangeMedico,
  medico,
  handleChangeEspecialidad,
}) => {
  var a = formCita.hora.split(':');
  const [value, setValue] = React.useState(true);

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="edit" /> Editar Cita
            </Header.Content>
          </Header>
          <hr />
          <HCHeader paciente={paciente} />

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Form
              size={matches.medium ? 'tiny' : null}
              onSubmit={onClickButtonSaveCita}
              id="formAgregar"
            >
              <Segment basic hidden={!value}>
                <b>Médico:</b>
                {' DR(A). ' +
                  medico.nombre.trim().toUpperCase() +
                  ' ' +
                  medico.apellido.trim().toUpperCase()}{' '}
              </Segment>

              <Segment basic>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Cambiar especialidad"
                    name="checkboxRadioGroup"
                    checked={value === false}
                    onChange={(e) => {
                      handleChangeEspecialidad(e, value);
                      setValue(!value);
                    }}
                  />
                </Form.Field>
              </Segment>
              <Segment hidden={value} basic>
                <Form.Group>
                  <Form.Select
                    label="Especialidades"
                    width={6}
                    options={especialidades}
                    placeholder="Especialidades"
                    onChange={handleOnChangeEspecialidad}
                    name="especialidades"
                    required
                  />
                  <Form.Select
                    label="Médicos"
                    width={6}
                    options={medicos}
                    placeholder="Médicos"
                    onChange={handleOnChangeMedico}
                    name="medico_id"
                    required
                  />
                </Form.Group>
              </Segment>
              <Segment basic>
                <Form.Group>
                  <Form.Input
                    label="Fecha"
                    placeholder="Fecha"
                    width={4}
                    type="date"
                    onChange={handleChange}
                    name="fecha"
                    value={formCita.fecha}
                    min={fechaActual()}
                    required
                  />
                  <Form.Select
                    label="Hora"
                    width={4}
                    options={horas}
                    placeholder="Hora"
                    onChange={handleOnChangeHora}
                    defaultValue={a[0] + ':' + a[1]}
                    name="hora"
                    required
                  />
                  <Form.Input
                    label="Teléfono "
                    placeholder="Teléfono  "
                    width={4}
                  >
                    <InputMask
                      mask="999999999999999"
                      maskChar={null}
                      onChange={handleChange}
                      name="telefono_paciente"
                      value={formCita.telefono_paciente}
                    />
                  </Form.Input>
                </Form.Group>

                <Form.Group>
                  <Form.TextArea
                    label="Motivo de cita"
                    placeholder="Motivo consulta"
                    width={16}
                    onChange={handleChange}
                    name="motivo_cita"
                    value={formCita.motivo_cita}
                  />
                </Form.Group>
              </Segment>
            </Form>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
