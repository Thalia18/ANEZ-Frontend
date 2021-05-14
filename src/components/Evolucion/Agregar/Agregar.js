import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import {
  Checkbox,
  Form,
  Header,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import {
  fechaActual,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollHC,
  mediumHeight,
  mediumScrollExtra,
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
  headerC,
  icon,
  cie10List,
  handleChangeCodigo,
  checkSelected,
  codigo,
  loadingDrop,
}) => {
  const [value, setValue] = React.useState(true);
  const handleChangeCheck = (e) => {
    setValue(!value);
  };
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name={icon} />
              {headerC}
            </Header.Content>
          </Header>
          <hr />
          <HCHeader paciente={paciente} />

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollHC}
          >
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
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    label="Diagnóstico Cie 10"
                    placeholder="Código o descripción"
                    width={6}
                    onChange={handleChangeCodigo}
                    value={codigo}
                    name="codigo"
                  />
                  <Form.Select
                    label="Seleccione"
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
                    loading={loadingDrop}
                  />
                </Form.Group>
                {cie10List && (
                  <Segment basic>
                    <b>Códigos seleccionados</b>
                    <br />
                    <br />

                    {cie10List.map((item) => {
                      let a = item.split('$');
                      return (
                        <Label
                          onClick={(e) => {
                            checkSelected(e, item);
                          }}
                          key={item}
                          style={{ margin: '0.2%' }}
                        >
                          {a[1]} <Icon name="delete" />
                        </Label>
                      );
                    })}
                  </Segment>
                )}
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
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
