import _ from 'lodash';
import React from 'react';
import Media from 'react-media';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Icon, InputGroup, Nav, Navbar } from 'rsuite';
import { Button, Form, Grid, Search } from 'semantic-ui-react';

import { GLOBAL_MEDIA_QUERIES } from '../utils/';

import 'rsuite/dist/styles/rsuite-default.css';
import 'semantic-ui-css/semantic.min.css';

const NavbarPacientes = ({ autoComplete, pacienteId, ...props }) => {
  let url = pacienteId === undefined ? '/pacientes' : `/paciente/${pacienteId}`;

  let source = [];
  autoComplete.data.forEach((element) => {
    let list = {
      description: element.cedula,
      price: element.apellido + ' ' + element.nombre,
      title:
        element.cedula.trim() +
        ' ➜ ' +
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

  console.log(value, 'value Nav');

  return (
    <Media queries={GLOBAL_MEDIA_QUERIES}>
      {(matches) => (
        <Navbar>
          <Navbar.Body>
            <Nav>
              <Nav.Item
                icon={<Icon icon='plus-circle' />}
                componentClass={Link}
                to={`/paciente_agregar`}
              >
                Agregar Paciente
              </Nav.Item>
              <Nav.Item icon={<Icon icon='heartbeat' />}>
                Agregar Historia clínica
              </Nav.Item>
              <Nav.Item icon={<Icon icon='calendar' />}>Agendar cita</Nav.Item>

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
              <InputGroup inside>
                <Form>
                  <Form.Group inline>
                    <Grid
                      style={
                        matches.medium
                          ? { marginBottom: 3, marginRight: 3 }
                          : { marginTop: 0.2, marginRight: 3 }
                      }
                    >
                      <Grid.Column width={16}>
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
                        />
                      </Grid.Column>
                    </Grid>
                    <Button
                      onClick={() =>
                        props.history.push(`/paciente_buscar/${value}`)
                      }
                      style={
                        matches.medium
                          ? { marginLeft: '-1.3em', marginTop: '-1.2em' }
                          : { marginLeft: '-1.3em', marginTop: '0.8em' }
                      }
                    >
                      <Icon icon='search' />
                    </Button>
                  </Form.Group>
                </Form>
              </InputGroup>
            </Nav>
          </Navbar.Body>
        </Navbar>
      )}
    </Media>
  );
};

export default withRouter(NavbarPacientes);
