import React from 'react';
import Media from 'react-media';
import { Carousel } from 'rsuite';
import { Segment } from 'semantic-ui-react';

import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES } from '../utils/';
import { SliderContainer } from './SliderStyles';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const Slider = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment>
          <Global
            style={matches.medium ? { height: '20em' } : { height: '55em' }}
          >
            <SliderContainer>
              <Carousel
                autoplay
                className='custom-slider'
                style={
                  matches.medium
                    ? { width: '100%', height: '70%' }
                    : { width: '100%', height: '90%' }
                }
              >
                <img src='https://i.ibb.co/hLjvrdL/logoANEZ.png' />
                <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2' />
                <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3' />
                <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4' />
                <img src='https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5' />
              </Carousel>
            </SliderContainer>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Slider;
