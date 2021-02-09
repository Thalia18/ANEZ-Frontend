import React from 'react';
import Media from 'react-media';
import { Form, Segment } from 'semantic-ui-react';

import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'semantic-ui-css/semantic.min.css';

const Agregar = ({ etnias, nivelDeInstruccion, estadoCivil, tipoDeSangre }) => {
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '20em' } : { height: '50em' }}
          >
            <Form>
              <Form.Group>
                <Form.Input label='Nombres' placeholder='Nombres' width={6} />
                <Form.Input
                  label='Apellidos'
                  placeholder='Apellidos'
                  width={6}
                />
                <Form.Input label='Cédula' placeholder='Cédula' width={5} />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Lugar de nacimiento'
                  placeholder='Lugar de nacimiento'
                  width={6}
                />
                <Form.Input
                  label='Fecha de nacimiento'
                  placeholder='Fecha de nacimiento'
                  width={4}
                  type='date'
                />

                <Form.Select
                  label='Estado civil'
                  placeholder='Estado civl'
                  options={options}
                  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input placeholder='8 Wide' width={8} />
                <Form.Input placeholder='6 Wide' width={6} />
                <Form.Input placeholder='2 Wide' width={2} />
              </Form.Group>
            </Form>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Agregar;
