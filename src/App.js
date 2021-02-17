import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import PacienteAgregarPage from './pages/Pacientes/PacienteAgregar';
import PacienteBuscarPage from './pages/Pacientes/PacienteBuscar';
import PacienteDetallePage from './pages/Pacientes/PacienteDetalle';
import PacienteEditarPage from './pages/Pacientes/PacienteEditar';
import PacientesPage from './pages/Pacientes/Pacientes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/main' component={MainPage} />
        <Route exact path='/pacientes' component={PacientesPage} />
        <Route
          exact
          path='/paciente/:pacienteId'
          component={PacienteDetallePage}
        />
        <Route exact path='/paciente_agregar' component={PacienteAgregarPage} />
        <Route
          exact
          path='/paciente_editar/:pacienteId'
          component={PacienteEditarPage}
        />
        <Route
          exact
          path='/paciente_buscar/:cedula'
          component={PacienteBuscarPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
