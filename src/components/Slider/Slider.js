import React from 'react';
import Media from 'react-media';
import { Carousel } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES } from '../utils/';
import { SliderContainer } from './SliderStyles';

const Slider = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment basic>
          <Global
            style={matches.medium ? { height: '35em' } : { height: '55em' }}
          >
            <SliderContainer style={{ margin: 'auto' }}>
              <Carousel
                autoplay
                className="custom-slider"
                style={
                  matches.medium
                    ? { width: '85%', height: '85%' }
                    : { width: '75%', height: '90%', margin: 'auto' }
                }
              >
                <img src="https://i.ibb.co/KGsD719/Screen-Shot-2021-05-03-at-19-30-35.png" />
                <img src="https://i.ibb.co/S0bdwk7/4.jpg" />
                <img src="https://i.ibb.co/DzHnc2G/6.jpg" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" />
              </Carousel>
            </SliderContainer>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Slider;
