import React from 'react';
import { Carousel } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Slider = () => {
  return (
    <Segment style={{ height: '60em' }}>
      <div
        style={{
          height: '70%',
          width: '80%',
          margin: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: ' translate(-50%,-50%)',
        }}
      >
        <Carousel
          autoplay
          className='custom-slider'
          style={{ width: '100%', height: '100%' }}
        >
          <img src='https://i.ibb.co/hLjvrdL/logoANEZ.png' />
          <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2' />
          <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3' />
          <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4' />
          <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5' />
        </Carousel>
      </div>
    </Segment>
  );
};

export default Slider;
