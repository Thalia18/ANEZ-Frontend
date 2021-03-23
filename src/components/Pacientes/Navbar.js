import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Container, Icon, InputGroup, Nav, Navbar } from 'rsuite';
import { Button, Form, Grid, Search } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({
  autoComplete,
  pacienteId,
  pageInitial,
  pageSecond,
  reload,
  optionNav,
  historiaId,
  ...props
}) => {
  let url =
    pacienteId === undefined ? { pageSecond } : `${pageInitial}/${pacienteId}`;
  let urlHC =
    pacienteId === undefined
      ? { pageSecond }
      : `/historia_clinica_agregar/${pacienteId}`;

  let urlCita =
    pacienteId === undefined ? { pageSecond } : `/cita_agregar/${pacienteId}`;

  let history = useHistory();
  let source = [];
  autoComplete.data.forEach((element) => {
    let list = {
      description: element.cedula,
      price: element.apellido + ' ' + element.nombre,
      title:
        element.cedula.trim() +
        ' ' +
        element.apellido.trim() +
        ' ' +
        element.nombre.trim(),
    };
    source.push(list);
  });

  const resultRenderer = ({ description, price }) => (
    <span>
      <b>{description}</b>
      <br />
      {price}
    </span>
  );

  const initialState = {
    loading: false,
    results: [],
    value: '',
  };

  function exampleReducer(state, action) {
    switch (action.type) {
      case 'CLEAN_QUERY':
        return initialState;
      case 'START_SEARCH':
        return { ...state, loading: true, value: action.query };
      case 'FINISH_SEARCH':
        return { ...state, loading: false, results: action.results };
      case 'UPDATE_SELECTION':
        return { ...state, value: action.selection };

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }
      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(result.title);
      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar style={{ background: 'rgba(0,161,213, 0.1)' }}>
          <Navbar.Body>
            <Nav>
              {!matches.medium && (
                <Nav.Item
                  icon={<Icon icon='angle-left' />}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              )}
              {optionNav === 'HC' && (
                <Nav.Item
                  icon={<Icon icon='heartbeat' />}
                  componentClass={Link}
                  key={pacienteId}
                  to={urlHC}
                  key={Math.random()}
                >
                  Crear Historia clínica
                </Nav.Item>
              )}
              {optionNav === 'PC' && (
                <React.Fragment>
                  <Nav.Item
                    icon={<Icon icon='plus-circle' />}
                    componentClass={Link}
                    to={`/paciente_agregar`}
                    key={Math.random()}
                  >
                    Crear Paciente
                  </Nav.Item>
                  <Nav.Item
                    key={Math.random()}
                    icon={<Icon icon='heartbeat' />}
                    componentClass={Link}
                    key={pacienteId}
                    to={urlHC}
                  >
                    Crear Historia clínica
                  </Nav.Item>
                  <Nav.Item
                    icon={<Icon icon='calendar' />}
                    componentClass={Link}
                    key={pacienteId}
                    to={urlCita}
                    key={Math.random()}
                  >
                    Agendar cita
                  </Nav.Item>
                </React.Fragment>
              )}

              <Nav.Item
                icon={<Icon icon='eye' />}
                componentClass={Link}
                key={pacienteId}
                to={url}
              >
                Ver
              </Nav.Item>
            </Nav>
            <Nav pullRight>
              <Container
                style={{
                  marginTop: '0.2em',
                  marginBottom: '-0.8em',
                  marginRight: '1em',
                }}
              >
                <InputGroup inside>
                  <Form>
                    <Form.Group inline>
                      {/* <Grid>
                        <Grid.Column width={16}> */}
                      <Search
                        input={{ icon: 'search', iconPosition: 'left' }}
                        loading={loading}
                        resultRenderer={resultRenderer}
                        onResultSelect={(e, data) =>
                          dispatch({
                            type: 'UPDATE_SELECTION',
                            selection: data.result.description.trim(),
                          })
                        }
                        onSearchChange={handleSearchChange}
                        results={results}
                        value={value}
                        style={
                          matches.medium
                            ? { marginRight: '1.3em', marginTop: '0.5em' }
                            : {
                                marginRight: '1.3em',
                                marginTop: '0.4em',
                              }
                        }
                      />
                      {/* </Grid.Column>
                      </Grid> */}
                      <Button
                        onClick={() => {
                          value === ''
                            ? props.history.push({ pageSecond })
                            : props.history.push(`${reload}/${value}`);
                          window.location.reload();
                        }}
                        style={
                          matches.medium
                            ? { marginLeft: '-1.3em', marginTop: '0.5em' }
                            : {
                                marginLeft: '-1.3em',
                                marginTop: '0.4em',
                              }
                        }
                      >
                        <Icon icon='search' />
                      </Button>
                    </Form.Group>
                  </Form>
                </InputGroup>
              </Container>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default withRouter(NavbarPacientes);
