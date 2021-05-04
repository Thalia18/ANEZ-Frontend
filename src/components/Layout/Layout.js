import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import Sidenav from '../Sidenav/Sidenav';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../utils';

const Layout = ({ activeKeyP, ...props }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <>
          <div
            style={
              colorBackground
              // height: matches.medium ? '48em' : '66em',
            }
          >
            <Sidenav children={props.children} activeKeyP={activeKeyP} />
            <br />
          </div>
        </>
      )}
    </Media>
  );
};

export default Layout;
