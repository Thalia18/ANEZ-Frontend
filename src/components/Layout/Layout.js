import React from 'react';
import Sidenav from '../Sidenav/Sidenav';

const Layout = ({ activeKeyP, ...props }) => {
  return (
    <div style={{ background: 'rgba(0,161,213, 0.1)' }}>
      <Sidenav children={props.children} activeKeyP={activeKeyP} />
    </div>
  );
};

export default Layout;
