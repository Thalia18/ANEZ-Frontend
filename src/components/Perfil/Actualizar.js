import React from 'react';
import InputMask from 'react-input-mask';
import Media from 'react-media';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';
import { DivScroll } from '../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScrollRecord,
  mediumHeight,
  mediumScrollExtra,
} from '../utils';

const Actualizar = ({
  handleChange,

  onClickButtonSaveDatos,

  usuario,
}) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
          <Header as="h1" textAlign="center">
            <Header.Content>
              <Icon name="edit" /> Actualizar datos
            </Header.Content>
          </Header>
          <hr />

          <DivScroll
            style={matches.medium ? mediumScrollExtra : maxMediumScrollRecord}
          >
            <Form
              size={matches.medium ? 'tiny' : null}
              onSubmit={onClickButtonSaveDatos}
              id="formAgregar"
            >
              <Form.Group>
                <Form.Input
                  label="Teléfono"
                  placeholder="Teléfono"
                  width={8}
                  required
                >
                  <InputMask
                    mask="999999999999999"
                    onChange={handleChange}
                    maskChar={null}
                    name="telefono"
                    value={usuario.telefono}
                    required
                  />
                </Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
                  width={16}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={usuario.email}
                  required
                />
              </Form.Group>
            </Form>
          </DivScroll>
        </Segment>
      )}
    </Media>
  );
};

export default Actualizar;
