import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
// import 'rsuite/dist/styles/rsuite-dark.css';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Dropdown, Icon, Nav, Navbar, Sidenav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Segment } from 'semantic-ui-react';
import { logoutUser } from '../../actions';
import { fechaCitas, GLOBAL_MEDIA_QUERIES, mapStateToProps } from '../utils';
import { Logo } from './SidenavStyles';

const SidenavC = ({ user, consultorio, activeKeyP, ...props }) => {
  const [expanded, setExpanded] = React.useState(true);
  let [activeKey, setActiveKey] = React.useState(Object.values(activeKeyP)[0]);

  const [widthColumnA, setwidthColumnA] = React.useState(3);
  const [widthColumnB, setWidthColumB] = React.useState(13);

  let history = useHistory();
  let date = new Date();
  let year = date.getFullYear();
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
    history.push('/');
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
              style={{ height: '102%' }}
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item
                    style={{
                      justifyContent: 'center',
                    }}
                    componentClass={Link}
                    to="/main"
                  >
                    <Logo src={consultorio.logo} />
                  </Nav.Item>
                  <Nav.Item
                    eventKey="1"
                    componentClass={Link}
                    to={`/citas/${fechaCitas(new Date())}/month`}
                  >
                    <Icon icon="calendar" /> Citas
                  </Nav.Item>

                  {user.rol.trim().toUpperCase() !== 'RECEPCIONISTA' && (
                    <Nav.Item
                      eventKey="2"
                      componentClass={Link}
                      to="/historias_clinicas"
                    >
                      <Icon icon="heartbeat" /> Historias clínicas
                    </Nav.Item>
                  )}
                  <Nav.Item eventKey="3" componentClass={Link} to="/pacientes">
                    <Icon icon="people-group" /> Pacientes
                  </Nav.Item>
                  {user.rol.trim().toUpperCase() === 'ADMINISTRADOR' && (
                    <Nav.Item
                      eventKey="4"
                      componentClass={Link}
                      to="/admin/usuarios"
                    >
                      <Icon icon="user-circle" /> Usuarios
                    </Nav.Item>
                  )}
                  {user.rol.trim().toUpperCase() === 'ADMINISTRADOR' && (
                    <Nav.Item
                      eventKey="5"
                      componentClass={Link}
                      to="/admin/consultorios"
                    >
                      <Icon icon="hospital-o" /> Consultorios
                    </Nav.Item>
                  )}
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Grid.Column>
          <Grid.Column width={matches.medium ? widthColumnB - 1 : widthColumnB}>
            <Navbar>
              <Navbar.Body>
                <Nav>
                  <Nav.Item
                    icon={<Icon icon="th" size="lg" />}
                    onClick={handleClick}
                  />
                  <Nav.Item
                    icon={<Icon icon="info-circle" size="lg" />}
                    onClick={() => history.push('/about')}
                  />
                </Nav>

                <Nav pullRight>
                  <Dropdown
                    icon={<Icon icon="user-circle-o" size="lg" />}
                    title={user.usuario}
                    size="md"
                    style={{ marginRight: '2em' }}
                  >
                    <Dropdown.Item
                      onClick={() => history.push(`/perfil/${user.usuario}`)}
                    >
                      <Icon icon="user-info" />
                      Perfil
                    </Dropdown.Item>

                    <Dropdown.Item onClick={logout}>
                      <Icon icon="sign-out" />
                      Log out
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              </Navbar.Body>
            </Navbar>
            <Segment
              style={matches.medium ? { height: '92%' } : { height: '94%' }}
            >
              {props.children}
              <div style={{ marginBottom: '-1.5em', fontSize: '0.8em' }}>
                <b>
                  <Icon icon="copyright" /> &nbsp; {year}, ANEZ | Todos los
                  derechos reservados.
                </b>
              </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidenavC)
);
