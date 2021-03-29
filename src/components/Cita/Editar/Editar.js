import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { DatePicker } from 'rsuite';
import { Dropdown, Form, Header, Icon, Segment } from 'semantic-ui-react';

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

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const Agregar = ({
  paciente,
  onClickButtonSaveCita,
  formCita,
  handleChange,
  horas,
  handleOnChangeHora,
}) => {
  const [value, setValue] = React.useState(new Date());

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                <Icon name='add circle' /> Nueva Cita
              </Header.Content>
            </Header>
            <hr />
            <HCHeader paciente={paciente} />

            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Form
                size={matches.medium ? 'tiny' : null}
                onSubmit={onClickButtonSaveCita}
                id='formAgregar'
              >
                <Form.Group>
                  <Form.Input
                    label='Fecha'
                    placeholder='Fecha'
                    width={4}
                    type='date'
                    onChange={handleChange}
                    name='fecha'
                    value={formCita.fecha}
                    min={fechaActual()}
                    required
                  />
                  <Form.Select
                    label='Hora'
                    width={2}
                    options={horas}
                    placeholder='Hora'
                    onChange={handleOnChangeHora}
                    name='hora'
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.TextArea
                    label='Motivo de cita'
                    placeholder='Motivo consulta'
                    width={16}
                    onChange={handleChange}
                    name='motivo_cita'
                    value={formCita.motivo_cita}
                    required
                  />
                </Form.Group>
              </Form>
            </DivScroll>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
