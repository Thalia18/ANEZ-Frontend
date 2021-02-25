import React from 'react';
import Media from 'react-media';
import { Checkbox, Form, Header, Icon, Message, Segment } from 'semantic-ui-react';

import { Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, maxMediumScroll, mediumHeight, mediumScroll } from '../../utils';
import Fotos from '../Fotos/Agregar';

import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  paciente,
  onClickButtonSaveEvolucion,
  handleChange,
  formEvolucion,
  fotosList,
}) => {
  const [value, setValue] = React.useState(true);
  const handleChangeCheck = (e) => {
    setValue(!value);
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Editar Evolución
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <div style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveEvolucion}
                id='formEditar'
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
                    max={today}
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
                  min={today}
                />
                <Form.Field>
                  <Checkbox
                    toggle
                    label='Agregar fotos'
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
