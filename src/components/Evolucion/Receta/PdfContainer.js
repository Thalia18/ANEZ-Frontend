import React from 'react';
import Media from 'react-media';
import { Segment } from 'semantic-ui-react';
import { Global } from '../../../global';
import {
  GLOBAL_MEDIA_QUERIES,
  masMediumHeight,
  mediumHeight,
} from '../../utils';
import Navbar from './NavbarReceta';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <React.Fragment>
          <Navbar createPdf={createPdf} />

          <Segment style={matches.medium ? mediumHeight : masMediumHeight}>
            <Global
              style={matches.medium ? { height: '45em' } : masMediumHeight}
            >
              <br />

              <section ref={bodyRef}>{props.children}</section>
            </Global>
          </Segment>
        </React.Fragment>
      )}
    </Media>
  );
};
