import React from 'react';
import Media from 'react-media';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import {
  Container,
  Form,
  Header,
  Icon,
  Message,
  Progress,
  Segment,
} from 'semantic-ui-react';
import { DivScroll, Global } from '../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../utils';

const Actualizar = ({
  handleChange,
  onClickButtonSaveDatos,
  percent,
  usuario,
}) => {
  const [passActual, setPassActual] = React.useState('password');
  const [passNew, setPassNew] = React.useState('password');
  const [passNewConfirm, setPassNewConfirm] = React.useState('password');
  const equal = usuario.passNew === usuario.passNewConfirm ? true : false;
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Header as="h1" textAlign="center">
              <Header.Content>
                <Icon name="key" /> Cambiar contraseña
              </Header.Content>
            </Header>
            <hr />
            <br />
            <DivScroll style={matches.medium ? mediumScroll : maxMediumScroll}>
              <Container style={{ width: '50%' }}>
                <Message>
                  <p>
                    La nueva contraseña debe contener al menos 5 caracteres
                    entre ellos:
                  </p>
                  <p>
                    <b>• Una letra en mayúscula. </b>
                  </p>
                  <p>
                    <b>• Un número.</b>
                  </p>
                </Message>
                <br />
                <Form
                  size={matches.medium ? 'tiny' : null}
                  onSubmit={onClickButtonSaveDatos}
                  id="formAgregar"
                >
                  <Form.Group>
                    <Form.Input
                      placeholder="Contraseña actual"
                      label="Contraseña actual"
                      width={16}
                      onChange={handleChange}
                      type={passActual}
                      name="passActual"
                      value={usuario.passActual}
                      required
                    />
                    <Segment
                      style={{ cursor: 'pointer' }}
                      basic
                      onClick={(e) => {
                        e.preventDefault();
                        if (passActual === 'text') {
                          setPassActual('password');
                        } else {
                          setPassActual('text');
                        }
                      }}
                    >
                      <Icon name="eye" size="large" />
                    </Segment>
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      label="Contraseña nueva"
                      placeholder="Contraseña nueva"
                      width={16}
                      onChange={handleChange}
                      name="passNew"
                      value={usuario.passNew}
                      type={passNew}
                      required
                    />

                    <Segment
                      style={{ cursor: 'pointer' }}
                      basic
                      onClick={(e) => {
                        e.preventDefault();
                        if (passNew === 'text') {
                          setPassNew('password');
                        } else {
                          setPassNew('text');
                        }
                      }}
                    >
                      <Icon name="eye" size="large" />
                    </Segment>
                  </Form.Group>
                  <Progress
                    percent={percent}
                    indicating
                    size="tiny"
                    style={{
                      width: matches.medium ? '78%' : '90%',
                    }}
                  />
                  <Form.Group>
                    <Form.Input
                      label="Confirmar nueva contraseña"
                      placeholder="Confirmar nueva contraseña"
                      width={16}
                      onChange={handleChange}
                      name="passNewConfirm"
                      value={usuario.passNewConfirm}
                      type={passNewConfirm}
                      required
                    />
                    <Segment
                      style={{ cursor: 'pointer' }}
                      basic
                      onClick={(e) => {
                        e.preventDefault();
                        if (passNewConfirm === 'text') {
                          setPassNewConfirm('password');
                        } else {
                          setPassNewConfirm('text');
                        }
                      }}
                    >
                      <Icon name="eye" size="large" />
                    </Segment>
                  </Form.Group>
                  {usuario.passNewConfirm !== '' && (
                    <>
                      {equal && (
                        <Progress
                          percent={100}
                          success
                          indicating
                          size="tiny"
                          style={{
                            width: matches.medium ? '78%' : '90%',
                          }}
                        />
                      )}
                      {!equal && (
                        <Progress
                          percent={100}
                          error
                          indicating
                          size="tiny"
                          style={{
                            width: matches.medium ? '78%' : '90%',
                          }}
                        />
                      )}
                    </>
                  )}
                </Form>
              </Container>
            </DivScroll>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Actualizar;
