import React from 'react';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Nav, Navbar } from 'rsuite';

import { colorBackground, GLOBAL_MEDIA_QUERIES } from '../../utils';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarRecetas = ({ createPdf }) => {
  let history = useHistory();

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={colorBackground}>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon='angle-left' />}
                onClick={() => {
                  history.goBack();
                }}
              />
            </Nav>
            <Nav pullRight>
              <Nav.Item>
                <Button
                  onClick={createPdf}
                  style={{
                    width: '8em',
                    height: '3em',
                    marginTop: '-0.7em',
                    paddingRight: '0.5em',
                    background: 'rgba(0,161,213, 0.01)',
                  }}
                >
                  <Icon icon='download' /> Descargar
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default NavbarRecetas;
