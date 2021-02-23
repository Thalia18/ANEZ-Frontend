import { BrowserRouter, Route, Switch } from 'react-router-dom';

import EvolucionAgregarPage from './pages/Evoluciones/EvolucionAgregar';
import EvolucionesPage from './pages/Evoluciones/Evoluciones';
import HCPage from './pages/HistoriasClinicas/HC';
import HCAgregarPage from './pages/HistoriasClinicas/HCAgregar';
import HCBuscarPage from './pages/HistoriasClinicas/HCBuscar';
import HCDetallePage from './pages/HistoriasClinicas/HCDetalle';
import HCEditarPage from './pages/HistoriasClinicas/HCEditar';
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
        //pagina login
        <Route exact path='/' component={LoginPage} />
        //pagina main
        <Route exact path='/main' component={MainPage} />
        //paginas de pacientes
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
        //paginas de historias clinicas
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
          path='/historia_clinica_editar/:historiaId/:pacienteId'
          component={HCEditarPage}
        />
        <Route
          exact
          path='/historia_clinica_buscar/:cedula'
          component={HCBuscarPage}
        />
        //paginas de evoluciones
        <Route
          exact
          path='/evolucion_agregar/:historiaId/:pacienteId'
          component={EvolucionAgregarPage}
        />
        <Route
          exact
          path='/evoluciones/:historiaId'
          component={EvolucionesPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
