import React from 'react';
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
import HCHeader from '../../HistoriasClinicas/HCHeader';
import { GLOBAL_MEDIA_QUERIES } from '../../utils';
import Fotos from '../Fotos/Agregar';

import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  paciente,
  onClickButtonSaveEvolucion,
  handleChange,
  formEvolucion,
  fotosList,
  fechaM,
  fechaPC,
}) => {
  const [value, setValue] = React.useState(true);
  const handleChangeCheck = (e) => {
    setValue(!value);
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '35em' } : { height: '53em' }}
          >
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Nueva Evolución
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <div
              style={
                matches.medium
                  ? { height: '22em', overflowY: 'auto', overflowX: 'hidden' }
                  : { height: '40em', overflowY: 'auto', overflowX: 'hidden' }
              }
            >
              <Message
                hidden={!fechaM}
                error
                header='Fecha de última menstruación no válida'
              />
              <Message
                hidden={!fechaPC}
                error
                header='Fecha de próximo control no válida'
              />
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveEvolucion}
                id='formAgregar'
              >
                <Form.Group>
                  <Form.TextArea
                    label='Motivo consulta'
                    placeholder='Motivo consulta'
                    width={16}
                    onChange={handleChange}
                    name='motivo_consulta'
                    value={formEvolucion.motivo_consulta}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label='Fecha última menstruación'
                    placeholder='Fecha última menstruación'
                    width={16}
                    type='date'
                    onChange={handleChange}
                    name='fecha_ultima_menstruacion'
                    value={formEvolucion.fecha_ultima_menstruacion}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label='Procedimiento'
                    placeholder='Procedimiento'
                    width={16}
                    onChange={handleChange}
                    name='procedimiento'
                    value={formEvolucion.procedimiento}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label='Diagnóstico'
                    placeholder='Diagnóstico'
                    width={16}
                    onChange={handleChange}
                    name='diagnostico'
                    value={formEvolucion.diagnostico}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label='Tratamiento'
                    placeholder='Tratamiento'
                    width={16}
                    onChange={handleChange}
                    name='tratamiento'
                    value={formEvolucion.tratamiento}
                    required
                  />
                </Form.Group>
                <Form.Input
                  label='Próximo control'
                  placeholder='Próximo control'
                  width={16}
                  type='date'
                  onChange={handleChange}
                  name='proximo_control'
                  value={formEvolucion.proximo_control}
                />
                <Form.Field>
                  <Checkbox
                    toggle
                    label='Ingresar fotos'
                    name='checkboxRadioGroup'
                    checked={value === false}
                    onChange={handleChangeCheck}
                  />
                </Form.Field>
                <Segment hidden={value} basic>
                  <Fotos fotosList={fotosList} />
                </Segment>
              </Form>
            </div>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
