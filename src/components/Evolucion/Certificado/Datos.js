import React from 'react';
import Media from 'react-media';
import { Form, Icon, Segment } from 'semantic-ui-react';
import { Global } from '../../../global';
import {
  fechaActual,
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  mediumHeight,
  tiempoReposo,
} from '../../utils';
import Navbar from '../Receta/NavbarReceta';

export default ({
  datos,
  handleOnChangeDias,
  handleChange,
  user,
  ...props
}) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar cert={true} />

          <Segment basic>
            <Global style={matches.medium ? mediumHeight : masMediumHeight}>
              <Segment>
                <b>Seleccione:</b>
                <br />
                <Segment>
                  <Icon name="calendar alternate" />
                  Fecha de ingreso y egreso
                  <br />
                  <br />
                  <Form size={matches.medium ? 'tiny' : null}>
                    <Form.Group>
                      <Form.Input
                        placeholder="Fecha de ingreso"
                        label="Fecha de ingreso"
                        width={4}
                        type="date"
                        onChange={handleChange}
                        name="fecha_ingreso"
                        value={datos.fecha_ingreso}
                        min={fechaActual()}
                      />
                      <Form.Input
                        placeholder="Fecha de egreso"
                        label="Fecha de egreso"
                        width={4}
                        type="date"
                        onChange={handleChange}
                        name="fecha_egreso"
                        value={datos.fecha_egreso}
                        min={fechaActual()}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
                <Segment>
                  <Icon name="bed" />
                  Reposo <br /> <br />
                  <Form size={matches.medium ? 'tiny' : null}>
                    <Form.Group>
                      <Form.Select
                        label="Número de días"
                        placeholder="Número de días"
                        options={tiempoReposo()}
                        onChange={handleOnChangeDias}
                        defaultValue={datos.dias_reposo}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        placeholder="Reposo desde"
                        label="Reposo desde"
                        width={4}
                        type="date"
                        onChange={handleChange}
                        name="fecha_inicio"
                        value={datos.fecha_inicio}
                        min={fechaActual()}
                        required
                      />
                      <Form.Input
                        placeholder="Reposo hasta"
                        label="Reposo hasta"
                        width={4}
                        type="date"
                        onChange={handleChange}
                        name="fecha_fin"
                        value={datos.fecha_fin}
                        min={fechaActual()}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.TextArea
                        label="Observaciones"
                        placeholder="Observaciones"
                        width={16}
                        rows={4}
                        onChange={handleChange}
                        name="observaciones"
                        value={datos.observaciones}
                        minLength={3}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
              </Segment>
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};
