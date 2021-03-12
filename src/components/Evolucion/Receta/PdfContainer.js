import React from 'react';
import Media from 'react-media';
import { Grid, Segment } from 'semantic-ui-react';

import { DivScroll, Global } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  maxMediumScroll,
  mediumHeight,
  mediumScroll,
} from '../../utils';
import Header from './Header';
import Navbar from './NavbarReceta';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar createPdf={createPdf} />

          <Segment>
            <Global
              style={matches.medium ? { height: '45em' } : masMediumHeight}
            >
              <br />

              {/* <DivScroll
                style={matches.medium ? mediumScroll : maxMediumScroll}
              > */}
              {/* <section className='pdf-container'>
                  <section className='pdf-toolbar'>
                    <button onClick={createPdf}>Create PDF</button>
                  </section> */}

              <section ref={bodyRef}>{props.children}</section>

              {/* </section> */}
              {/* </DivScroll> */}
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};
