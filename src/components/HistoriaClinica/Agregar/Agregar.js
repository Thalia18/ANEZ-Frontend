import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Checkbox, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll, Global } from '../../../global';
import HCHeader from '../../HistoriasClinicas/HCHeader';
import Modal from '../../Modales/ModalExists';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';

const Agregar = ({
  paciente,
  onClickButtonSaveHC,
  handleChange,
  formHC,
  existsHC,
  header,
  content,
  pacienteId,
  id,
  headerC,
  icon,
}) => {
  const [value, setValue] = React.useState(true);
  const handleChangeCheck = (e) => {
    setValue(!value);
  };
  console.log(paciente);

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name={icon} /> {headerC}
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveHC}
                id={id}
              >
                <Form.Group>
                  <Form.TextArea
                    label="Antecedentes patológicos"
                    placeholder="Antecedentes patológicos"
                    width={16}
                    onChange={handleChange}
                    name="antecedente_patologico_personal"
                    value={formHC.antecedente_patologico_personal}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label="Antecedentes quirúrgicos"
                    placeholder="Antecedentes quirúrgicos"
                    width={16}
                    onChange={handleChange}
                    name="antecedente_quirurgico"
                    value={formHC.antecedente_quirurgico}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label="Alergias"
                    placeholder="Alergias"
                    width={16}
                    onChange={handleChange}
                    name="alergia"
                    value={formHC.alergia}
                    required
                  />
                </Form.Group>
                {paciente.generos.genero.trim() === 'FEMENINO' && (
                  <>
                    <Form.Field>
                      <Checkbox
                        toggle
                        label="Ingresar antecedentes gineco-obstétricos"
                        name="checkboxRadioGroup"
                        checked={value === false}
                        onChange={handleChangeCheck}
                      />
                    </Form.Field>

                    <Segment hidden={value} basic>
                      <Form.Group>
                        <Form.TextArea
                          label="Abortos"
                          placeholder="Abortos"
                          width={8}
                          onChange={handleChange}
                          name="aborto"
                          value={formHC.aborto}
                          required={!value}
                        />
                        <Form.TextArea
                          label="Cesáreas"
                          placeholder="Cesáreas"
                          width={8}
                          onChange={handleChange}
                          name="cesarea"
                          value={formHC.cesarea}
                          required={!value}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.TextArea
                          label="Gestas"
                          placeholder="Gestas"
                          width={8}
                          onChange={handleChange}
                          name="gesta"
                          value={formHC.gesta}
                          required={!value}
                        />
                        <Form.TextArea
                          label="Partos"
                          placeholder="Partos"
                          width={8}
                          onChange={handleChange}
                          name="parto"
                          value={formHC.parto}
                          required={!value}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.TextArea
                          label="Método anticonceptivo"
                          placeholder="Método anticonceptivo"
                          width={16}
                          onChange={handleChange}
                          name="metodo_anticonceptivo"
                          value={formHC.metodo_anticonceptivo}
                          required={!value}
                        />
                      </Form.Group>
                    </Segment>
                  </>
                )}
              </Form>
            </DivScroll>
            <Modal
              existsHC={existsHC}
              header={header}
              content={content}
              pacienteId={pacienteId}
            />
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
