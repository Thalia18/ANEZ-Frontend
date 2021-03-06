import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';
import { mapStateToProps } from '../components/utils';

const Main = ({ user, ...props }) => {
  if (user != null && user.isLoggedIn)
    return (
      <div style={{ height: '100%' }}>
        <Layout activeKeyP='1'>
          <Slider />
        </Layout>
      </div>
    );
  else return <>{props.history.push('/')}</>;
};

export default connect(mapStateToProps, null)(Main);
