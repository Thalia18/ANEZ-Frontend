import React from 'react';
import Layout from '../components/Layout/Layout';
import Slider from '../components/Slider/Slider';

const Main = () => {
  return (
    <div style={{ height: '100%' }}>
      <Layout activeKeyP='1'>
        <Slider />
      </Layout>
    </div>
  );
};

export default Main;
