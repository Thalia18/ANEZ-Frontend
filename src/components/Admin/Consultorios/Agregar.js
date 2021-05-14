import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { DivScroll } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../../utils';

const Agregar = ({
  handleChange,
  id,
  formConsultorio,
  onClickButtonSaveUsuario,
  foto,
  headerC,
  icon,
}) => {
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

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Form
              size={matches.medium ? 'tiny' : null}
              onSubmit={onClickButtonSaveUsuario}
              id="formAgregar"
            >
              <Form.Group>
                <Form.Input
                  label="Nombre"
                  placeholder="Nombre"
                  width={11}
                  onChange={handleChange}
                  name="nombre"
                  value={formConsultorio.nombre}
                  minLength={2}
                  required
                />

                <Form.Input label="RUC" placeholder="RUC" width={5} required>
                  <InputMask
                    mask="9999999999-001"
                    onChange={handleChange}
                    name="ruc"
                    value={formConsultorio.ruc}
                    pattern=".{14}"
                    maskChar={null}
                    required
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Dirección"
                  placeholder="Dirección"
                  width={11}
                  onChange={handleChange}
                  name="direccion"
                  value={formConsultorio.direccion}
                  minLength={2}
                  required
                />
                <Form.Input
                  label="Teléfono"
                  placeholder="Teléfono"
                  width={5}
                  required
                >
                  <InputMask
                    mask="999999999999999"
                    onChange={handleChange}
                    maskChar={null}
                    name="telefono"
                    value={formConsultorio.telefono}
                    required
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.TextArea
                  label="Logo"
                  placeholder="Logo URL"
                  name="logo"
                  width={14}
                  rows={5}
                  value={formConsultorio.logo}
                  onChange={handleChange}
                  required
                />
                <Image src={formConsultorio.logo || ''} size="small" rounded />
              </Form.Group>
            </Form>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
