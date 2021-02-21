import React from 'react';
import Media from 'react-media';
import {
  Checkbox,
  Form,
  Header,
  Icon,
  Segment,
  Message,
  Table,
} from 'semantic-ui-react';
import Modal from '../../Modales/ModalExists';

import HCHeader from '../../HistoriasClinicas/HCHeader';
import { Global } from '../../../global';
import { GLOBAL_MEDIA_QUERIES, calculaEdad } from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  paciente,
  onClickButtonSaveHC,
  handleChange,
  formHC,

  campos,
  fechaError,
  existsHC,
  header,
  content,
  closeModal,
  pacienteId,
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
                <Icon name='add circle' /> Nueva Historia Clínica
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />
            {/* <Message
              hidden={!campos}
              warning
              header='Complete todos los campos requeridos (*).'
            />
            <Message
              hidden={!fechaError}
              error
              header='Error en la fecha de nacimiento'
            /> */}
            <div
              style={
                matches.medium
                  ? { height: '22em', overflowY: 'auto', overflowX: 'hidden' }
                  : { height: '40em', overflowY: 'auto', overflowX: 'hidden' }
              }
            >
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveHC}
                id='formAgregar'
              >
                <Form.Group>
                  <Form.TextArea
                    label='Antecedentes patológicos'
                    placeholder='Antecedentes patológicos'
                    width={16}
                    onChange={handleChange}
                    name='antecedente_patologico_personal'
                    value={formHC.antecedente_patologico_personal}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label='Antecedentes quirúrgicos'
                    placeholder='Antecedentes quirúrgicos'
                    width={16}
                    onChange={handleChange}
                    name='antecedente_quirurgico'
                    value={formHC.antecedente_quirurgico}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.TextArea
                    label='Alergias'
                    placeholder='Alergias'
                    width={16}
                    onChange={handleChange}
                    name='alergia'
                    value={formHC.alergia}
                    required
                  />
                </Form.Group>
                <Form.Field>
                  <Checkbox
                    toggle
                    label='Ingresar datos de abortos, cesáreas, gestas, partos y método anticonceptivo '
                    name='checkboxRadioGroup'
                    checked={value === false}
                    onChange={handleChangeCheck}
                  />
                </Form.Field>

                <Segment hidden={value} basic>
                  <Form.Group>
                    <Form.TextArea
                      label='Abortos'
                      placeholder='Abortos'
                      width={8}
                      onChange={handleChange}
                      name='aborto'
                      value={formHC.aborto}
                      required={!value}
                    />
                    <Form.TextArea
                      label='Cesáreas'
                      placeholder='Cesáreas'
                      width={8}
                      onChange={handleChange}
                      name='cesarea'
                      value={formHC.cesarea}
                      required={!value}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.TextArea
                      label='Gestas'
                      placeholder='Gestas'
                      width={8}
                      onChange={handleChange}
                      name='gesta'
                      value={formHC.gesta}
                      required={!value}
                    />
                    <Form.TextArea
                      label='Partos'
                      placeholder='Partos'
                      width={8}
                      onChange={handleChange}
                      name='parto'
                      value={formHC.parto}
                      required={!value}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.TextArea
                      label='Método anticonceptivo'
                      placeholder='Método anticonceptivo'
                      width={16}
                      onChange={handleChange}
                      name='metodo_anticonceptivo'
                      value={formHC.metodo_anticonceptivo}
                      required={!value}
                    />
                  </Form.Group>
                </Segment>
              </Form>
            </div>
            <Modal
              existsHC={existsHC}
              header={header}
              content={content}
              closeModal={closeModal}
              pacienteId={pacienteId}
            />
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
