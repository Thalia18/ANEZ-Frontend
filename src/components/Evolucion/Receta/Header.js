import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Image } from 'semantic-ui-react';

import { eliminarTildes, mapStateToProps } from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Header = ({ user, consultorio, especialidad }) => {
  return (
    <Grid>
      <Grid.Column width={5}>
        <Image src={consultorio.logo} style={{ height: '7.5em' }} />
      </Grid.Column>
      <Grid.Column width={9} textAlign='center'>
        <Container style={{ marginTop: '1em' }}>
          <Container>{eliminarTildes(consultorio.nombre)}</Container>

          <Container
            style={{
              fontStyle: 'italic',
              fontSize: '1.3em',
              fontWeight: 'bold',
              fontFamily: 'Bookman, URW Bookman L, serif',
            }}
          >
            DR(A).&nbsp; {eliminarTildes(user.nombre)}
            &nbsp;
            {eliminarTildes(user.apellido)}
          </Container>
          <Container
            style={{
              fontSize: '0.9em',
            }}
          >
            {eliminarTildes(especialidad.especialidades.especialidad)}
          </Container>
        </Container>
      </Grid.Column>
      <Image src='https://i.ibb.co/L8zMCCQ/Screen-Shot-2021-02-27-at-20-24-43.png' />
    </Grid>
  );
};
export default connect(mapStateToProps, null)(Header);
