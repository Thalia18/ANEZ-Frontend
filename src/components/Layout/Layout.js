import React from 'react';
import Media from 'react-media';
import 'semantic-ui-css/semantic.min.css';
import { Global } from '../../global';
import Sidenav from '../Sidenav/Sidenav';
import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../utils';

const Layout = ({ activeKeyP, ...props }) => {
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES} key={Math.floor(Math.random)}>
      {(matches) => (
        <Global style={colorBackground}>
          <Sidenav children={props.children} activeKeyP={activeKeyP} />
          <br />
          <br />
        </Global>
      )}
    </Media>
  );
};

export default Layout;
