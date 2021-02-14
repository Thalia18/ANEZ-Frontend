import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import PacienteAgregarPage from './pages/PacienteAgregar';
import PacienteEditarPage from './pages/PacienteEditar';

import PacienteDetallePage from './pages/PacienteDetalle';
import PacientesPage from './pages/Pacientes';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
        <Route exact path='/' component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
