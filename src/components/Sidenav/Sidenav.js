import React from 'react';
import Media from 'react-media';
// import 'rsuite/dist/styles/rsuite-dark.css';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Icon, Nav, Navbar, Sidenav } from 'rsuite';
import { Grid, Segment } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';
import { Logo } from './SidenavStyles';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const SidenavC = ({ activeKeyP, ...props }) => {
  const [expanded, setExpanded] = React.useState(true);
  let [activeKey, setActiveKey] = React.useState(Object.values(activeKeyP)[0]);

  const [widthColumnA, setwidthColumnA] = React.useState(3);
  const [widthColumnB, setWidthColumB] = React.useState(13);

  let history = useHistory();

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

  const logout = (e) => {
    e.preventDefault();
    props.logoutUser([]);
    history.push('/login');
  };

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Grid columns={2}>
          <Grid.Column width={matches.medium ? widthColumnA + 1 : widthColumnA}>
            <Sidenav
              expanded={expanded}
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
                  <Nav.Item eventKey='1'>
                    <Icon icon='calendar' /> Citas
                  </Nav.Item>
                  <Nav.Item eventKey='2'>
                    <Icon icon='heartbeat' /> Historias clínicas
                  </Nav.Item>
                  <Nav.Item eventKey='3' componentClass={Link} to='pacientes'>
                    <Icon icon='people-group' /> Pacientes
                  </Nav.Item>
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
                  <Nav.Item
                    icon={<Icon icon='cog' />}
                    // componentClass='button'
                    onClick={logout}
                  >
                    Log out
                  </Nav.Item>
                </Nav>
              </Navbar.Body>
            </Navbar>
            <Segment
              style={matches.medium ? { height: '90%' } : { height: '93%' }}
            >
              {props.children}
            </Segment>
          </Grid.Column>
        </Grid>
      )}
    </Media>
  );
};

const mapDispatchToProps = {
  logoutUser,
};
export default withRouter(connect(null, mapDispatchToProps)(SidenavC));
