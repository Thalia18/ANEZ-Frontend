import React from 'react';
import Media from 'react-media';
import {
  Checkbox,
  Form,
  Header,
  Icon,
  Segment,
  Dropdown,
} from 'semantic-ui-react';
import _ from 'lodash';
import { DivScroll, Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';
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

  const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  ];
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Nueva Evolución
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
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
                <Segment>
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
                    <Dropdown
                      clearable
                      fluid
                      multiple
                      search
                      selection
                      options={countryOptions}
                      placeholder='Select Country'
                    />
                  </Form.Group>
                </Segment>
                <Form.Group>
                  <Form.TextArea
                    label='Medicación'
                    placeholder='Medicación'
                    width={8}
                    onChange={handleChange}
                    name='medicacion'
                    value={formEvolucion.medicacion}
                    maxLength={1300}
                    rows={10}
                  />
                  <Form.TextArea
                    label='Indicaciones'
                    placeholder='Indicaciones'
                    width={8}
                    onChange={handleChange}
                    name='indicacion'
                    value={formEvolucion.indicacion}
                    maxLength={1300}
                    rows={10}
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
            </DivScroll>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
