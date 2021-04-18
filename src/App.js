import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'rsuite';
import es_ES from 'rsuite/lib/IntlProvider/locales/es_ES';

import CitasAgregarPage from './pages/Citas/CitaAgregar';
import CitaBuscarPage from './pages/Citas/CitaBuscar';
import CitaPage from './pages/Citas/CitaDetalle';
import CitasPage from './pages/Citas/Citas';
import CitasEditarPage from './pages/Citas/CitasEditar';
import EvolucionAgregarPage from './pages/Evoluciones/EvolucionAgregar';
import EvolucionBuscarPage from './pages/Evoluciones/EvolucionBuscar';
import EvolucionPage from './pages/Evoluciones/EvolucionDetalle';
import EvolucionesPage from './pages/Evoluciones/Evoluciones';
import EvolucionEditarPage from './pages/Evoluciones/EvolucionesEditar';
import RecetaPage from './pages/Evoluciones/Receta';
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
import UsuariosPage from './pages/Admin/Usuarios/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <IntlProvider locale={es_ES}>
          {/* //pagina login */}
          <Route exact path='/' component={LoginPage} />
          {/* //pagina main */}
          <Route exact path='/main' component={MainPage} />
          {/* //paginas de pacientes */}
          <Route exact path='/pacientes' component={PacientesPage} />
          <Route
            exact
            path='/paciente/:pacienteId'
            component={PacienteDetallePage}
          />
          <Route
            exact
            path='/paciente_agregar'
            component={PacienteAgregarPage}
          />
          <Route
            exact
            path='/paciente_editar/:pacienteId'
            component={PacienteEditarPage}
          />
          <Route
            exact
            path='/paciente_buscar/:buscar'
            component={PacienteBuscarPage}
          />
          {/* //paginas de historias clinicas */}
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
            path='/historia_clinica_buscar/:buscar'
            component={HCBuscarPage}
          />
          {/* //paginas de evoluciones */}
          <Route
            exact
            path='/evolucion_agregar/:historiaId/:pacienteId'
            component={EvolucionAgregarPage}
          />
          <Route
            exact
            path='/evolucion_editar/:evolucionId/:historiaId'
            component={EvolucionEditarPage}
          />
          <Route
            exact
            path='/evolucion/:evolucionId/:historiaId'
            component={EvolucionPage}
          />
          <Route
            exact
            path='/evoluciones/:historiaId'
            component={EvolucionesPage}
          />
          <Route
            exact
            path='/evolucion_buscar/:historiaId/:fecha1/:fecha2'
            component={EvolucionBuscarPage}
          />
          {/* //pagina de receta */}
          <Route exact path='/receta/:evolucionId' component={RecetaPage} />
          {/* //paginas de citas */}
          <Route exact path='/citas/:fecha/:view' component={CitasPage} />
          <Route
            exact
            path='/citas_buscar/:fecha1/:fecha2'
            component={CitaBuscarPage}
          />
          <Route exact path='/cita_detalle/:citaId' component={CitaPage} />
          <Route
            exact
            path='/cita_agregar/:pacienteId'
            component={CitasAgregarPage}
          />
          <Route
            exact
            path='/cita_editar/:pacienteId/:citaId'
            component={CitasEditarPage}
          />
          {/* //páginas de admin */}
          <Route exact path='/admin/usuarios' component={UsuariosPage} />
        </IntlProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
