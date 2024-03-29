import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import AboutComponent from '../../components/Sidenav/About';
import { mapStateToProps } from '../../components/utils';

const About = ({ user, ...props }) => {
  if (user != null && user.isLoggedIn)
    return (
      <div style={{ height: '100%' }}>
        <Layout activeKeyP="0">
          <AboutComponent />
        </Layout>
      </div>
    );
  else return <>{props.history.push('/error_auth')}</>;
};
export default connect(mapStateToProps, null)(About);
