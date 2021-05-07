import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Checkbox, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll, Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaActual,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';
import Fotos from '../Fotos/Agregar';

const Agregar = ({
  paciente,
  onClickButtonSaveEvolucion,
  handleChange,
  formEvolucion,
  fotosList,
  cie10,
  handleOnChangeCie10,
  id,
  headerC,
  icon,
  cie10List,
}) => {
  const [value, setValue] = React.useState(true);
  const handleChangeCheck = (e) => {
    setValue(!value);
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name={icon} />
                {headerC}
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveEvolucion}
                id="formAgregar"
              >
                <Form.Group>
                  <Form.TextArea
                    label="Motivo consulta"
                    placeholder="Motivo consulta"
                    width={16}
                    onChange={handleChange}
                    name="motivo_consulta"
                    value={formEvolucion.motivo_consulta}
                    rows={5}
                    required
                  />
                </Form.Group>
                {paciente.genero_id === 1 && (
                  <Form.Group>
                    <Form.Input
                      label="Fecha última menstruación"
                      placeholder="Fecha última menstruación"
                      width={16}
                      type="date"
                      onChange={handleChange}
                      name="fecha_ultima_menstruacion"
                      value={formEvolucion.fecha_ultima_menstruacion}
                      max={fechaActual()}
                    />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.TextArea
                    label="Procedimiento"
                    placeholder="Procedimiento"
                    width={16}
                    onChange={handleChange}
                    name="procedimiento"
                    rows={5}
                    value={formEvolucion.procedimiento}
                    required
                  />
                </Form.Group>
                <Segment>
                  <Form.Group>
                    <Form.TextArea
                      label="Diagnóstico"
                      placeholder="Diagnóstico"
                      width={16}
                      onChange={handleChange}
                      name="diagnostico"
                      value={formEvolucion.diagnostico}
                      rows={5}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Select
                      clearable
                      fluid
                      multiple
                      search
                      selection
                      width={16}
                      options={cie10}
                      placeholder="Seleccione código CIE 10"
                      onChange={handleOnChangeCie10}
                      defaultValue={cie10List}
                    />
                  </Form.Group>
                </Segment>
                <Form.Group>
                  <Form.TextArea
                    label="Medicación"
                    placeholder="Medicación"
                    width={8}
                    onChange={handleChange}
                    name="medicacion"
                    value={formEvolucion.medicacion}
                    maxLength={1200}
                    rows={10}
                  />
                  <Form.TextArea
                    label="Indicaciones"
                    placeholder="Indicaciones"
                    width={8}
                    onChange={handleChange}
                    name="indicacion"
                    value={formEvolucion.indicacion}
                    maxLength={1200}
                    rows={10}
                  />
                </Form.Group>
                <Form.Input
                  label="Próximo control"
                  placeholder="Próximo control"
                  width={16}
                  type="date"
                  onChange={handleChange}
                  name="proximo_control"
                  value={formEvolucion.proximo_control}
                  min={fechaActual()}
                />
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Agregar fotos"
                    name="checkboxRadioGroup"
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
