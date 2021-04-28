import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Container, Segment } from 'semantic-ui-react';
import { Global } from '../../global';
import { GLOBAL_MEDIA_QUERIES, masMediumHeight, mediumHeight } from '../utils';
import './style.css';
const Loader = () => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Segment basic>
          <Global style={matches.medium ? mediumHeight : masMediumHeight}>
            <Container
              style={{
                height: '60%',
                marginTop: '10%',
              }}
            >
              <div className="indicator">
                <svg width="35px" height="15px">
                  <polyline
                    className="back"
                    points="1 6 3 6 6 12 11 5 13 7 15 7 17 2 21 13 23 6 29 6"
                  ></polyline>
                  <polyline
                    className="front"
                    points="1 6 3 6 6 12 11 5 13 7 15 7 17 2 21 13 23 6 29 6"
                  ></polyline>
                </svg>
              </div>
            </Container>
          </Global>
        </Segment>
      )}
    </Media>
  );
};

export default Loader;
