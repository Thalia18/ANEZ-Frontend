import React from 'react';
import Sidenav from '../Sidenav/Sidenav';
import { GLOBAL_MEDIA_QUERIES, colorBackground } from '../utils';
import Media from 'react-media';

const Layout = ({ activeKeyP, ...props }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <div
          style={
            colorBackground
            // height: matches.medium ? '48em' : '66em',
          }
        >
          <Sidenav children={props.children} activeKeyP={activeKeyP} />
        </div>
      )}
    </Media>
  );
};

export default Layout;
