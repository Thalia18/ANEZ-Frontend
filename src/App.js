import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import PacienteAgregarPage from './pages/Pacientes/PacienteAgregar';
import HCAgregarPage from './pages/HistoriasClinicas/HCAgregar';
import PacienteBuscarPage from './pages/Pacientes/PacienteBuscar';
import PacienteDetallePage from './pages/Pacientes/PacienteDetalle';
import PacienteEditarPage from './pages/Pacientes/PacienteEditar';
import PacientesPage from './pages/Pacientes/Pacientes';
import HCPage from './pages/HistoriasClinicas/HC';
import HCDetallePage from './pages/HistoriasClinicas/HCDetalle';
import HCBuscarPage from './pages/HistoriasClinicas/HCBuscar';

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
        <Route exact path='/historias_clinicas' component={HCPage} />

        <Route
          exact
          path='/historia_clinica_agregar/:pacienteId'
          component={HCAgregarPage}
        />
        <Route
          exact
          path='/historia_clinica/:pacienteId'
          component={HCDetallePage}
        />
        <Route
          exact
          path='/historia_clinica_buscar/:cedula'
          component={HCBuscarPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
