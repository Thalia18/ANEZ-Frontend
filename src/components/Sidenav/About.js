import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Container, Image, Segment } from 'semantic-ui-react';
import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES } from '../utils/';
const About = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment basic>
          <Global
            style={matches.medium ? { height: '35em' } : { height: '55em' }}
          >
            <Container
              style={{ textAlign: 'center', display: 'flex', marginTop: '12%' }}
            >
              <Image
                style={{ padding: '3em' }}
                src="https://i.ibb.co/ygcHZFY/circle-cropped-1.png"
                size="medium"
              />
              <Segment
                basic
                style={{
                  margin: '3em',
                  textAlign: 'justify',
                  fontSize: '1.1em',
                }}
              >
                <b>MISIÓN</b>
                <p>
                  Brindar servicios de salud integral mediante la aplicación
                  técnicas y tecnología en tratamientos médicos de salud facial
                  y corporal, para el mejoramiento la calidad de vida.
                </p>
                <br />
                <b>VISIÓN</b>
                <p>
                  Ser un centro de salud integral, entregando una atención
                  personalizada con calidad y calidez para el mejoramiento del
                  estilo de vida de las personas.
                </p>
              </Segment>
            </Container>
            <Container style={{ textAlign: 'center', fontSize: '1.1em' }}>
              <b>Diseñado y desarrollado por Thalía Zapata - PUCE.</b>
            </Container>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default About;
