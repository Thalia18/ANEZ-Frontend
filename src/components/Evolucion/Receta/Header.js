import React from 'react';

import { connect } from 'react-redux';

import { Container, Grid, Icon, Image } from 'semantic-ui-react';

import { mapStateToProps } from '../../utils';

import 'semantic-ui-css/semantic.min.css';

const Header = ({ user, consultorio }) => {
  return (
    <Grid>
      <Grid.Column width={5}>
        <Image src={consultorio.logo} style={{ height: '6em' }} />
      </Grid.Column>
      <Grid.Column width={9} textAlign='center'>
        <Container style={{ marginTop: '1em' }}>
          <Container>{consultorio.nombre}</Container>

          <Container
            style={{
              fontStyle: 'italic',
              fontSize: '0.9em',
              fontWeight: 'bold',
              fontFamily: 'Bookman, URW Bookman L, serif',
            }}
          >
            DRA.&nbsp; {user.nombre}
            &nbsp;
            {user.apellido}
          </Container>
          <Container
            style={{
              fontSize: '0.7em',
            }}
          >
            {/* {especialidad} */}
          </Container>
        </Container>
      </Grid.Column>
      <Image src='https://i.ibb.co/L8zMCCQ/Screen-Shot-2021-02-27-at-20-24-43.png' />
    </Grid>
  );
};
export default connect(mapStateToProps, null)(Header);
