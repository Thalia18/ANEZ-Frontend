import React from 'react';
import Media from 'react-media';
import { Carousel } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import { GLOBAL_MEDIA_QUERIES, mediumHeight } from '../utils/';
import { SliderContainer } from './SliderStyles';

const Slider = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Segment basic style={mediumHeight}>
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
              <img
                src="https://i.ibb.co/KGsD719/Screen-Shot-2021-05-03-at-19-30-35.png"
                alt="ANEZ 1"
              />
              <img src="https://i.ibb.co/S0bdwk7/4.jpg" alt="ANEZ 2" />
              <img src="https://i.ibb.co/DzHnc2G/6.jpg" alt="ANEZ 3" />
              <img
                src="https://i.ibb.co/5hSVnvg/74d46863-a45e-436f-b5f0-4a5175ecd052.jpg"
                alt="ANEZ 4"
              />
              <img src="https://i.ibb.co/BsbNPZ6/7.jpg" alt="ANEZ 5" />
            </Carousel>
          </SliderContainer>
        </Segment>
      )}
    </Media>
  );
};

export default Slider;
