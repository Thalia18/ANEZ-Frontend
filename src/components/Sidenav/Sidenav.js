import React from 'react';
// import 'rsuite/dist/styles/rsuite-dark.css';
import Media from 'react-media';
import { Dropdown, Icon, Nav, Navbar, Sidenav } from 'rsuite';
import { Grid, Segment } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';
import { Logo } from './SidenavStyles';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const SidenavC = (props) => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState('1');
  const [widthColumnA, setwidthColumnA] = React.useState(3);
  const [widthColumnB, setWidthColumB] = React.useState(13);

  const handleClick = () => {
    expanded ? setExpanded(false) : setExpanded(true);

    if (!expanded) {
      setwidthColumnA(3);
      setWidthColumB(13);
    } else {
      setwidthColumnA(1);
      setWidthColumB(15);
    }
  };
  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Grid columns={2}>
          <Grid.Column width={matches.medium ? widthColumnA + 1 : widthColumnA}>
            <Sidenav
              expanded={expanded}
              defaultOpenKeys={['3', '4']}
              activeKey={activeKey}
              onSelect={handleSelect}
              style={{ height: '100%' }}
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    <Logo src='https://i.ibb.co/hLjvrdL/logoANEZ.png' />
                  </Nav.Item>
                  <Dropdown
                    placement='rightStart'
                    eventKey='1'
                    title='Citas'
                    icon={<Icon icon='calendar' />}
                  >
                    <Dropdown.Item eventKey='1-1'>Agregar</Dropdown.Item>
                    <Dropdown.Item eventKey='1-2'>Ver </Dropdown.Item>
                  </Dropdown>
                  <Dropdown
                    placement='rightStart'
                    eventKey='2'
                    title='Historias clínicas'
                    icon={<Icon icon='heartbeat' />}
                  >
                    <Dropdown.Item eventKey='2-1'>Agregar</Dropdown.Item>
                    <Dropdown.Item eventKey='2-2'>Ver</Dropdown.Item>
                  </Dropdown>
                  <Dropdown
                    placement='rightStart'
                    eventKey='3'
                    title='Pacientes'
                    icon={<Icon icon='people-group' />}
                  >
                    <Dropdown.Item eventKey='3-1'>Agregar</Dropdown.Item>
                    <Dropdown.Item eventKey='3-2'>Ver</Dropdown.Item>
                  </Dropdown>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Grid.Column>
          <Grid.Column width={matches.medium ? widthColumnB - 1 : widthColumnB}>
            <Navbar>
              <Navbar.Body>
                <Nav>
                  <Nav.Item icon={<Icon icon='th' />} onClick={handleClick} />
                </Nav>
                <Nav pullRight>
                  <Nav.Item icon={<Icon icon='cog' />}>Log out</Nav.Item>
                </Nav>
              </Navbar.Body>
            </Navbar>
            <Segment
              style={matches.medium ? { height: '86%' } : { height: '93%' }}
            >
              {props.children}
            </Segment>
          </Grid.Column>
        </Grid>
      )}
    </Media>
  );
};

export default SidenavC;
