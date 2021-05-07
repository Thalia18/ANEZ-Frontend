import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'rsuite';
import es_ES from 'rsuite/lib/IntlProvider/locales/es_ES';
import ConsultorioAgregarPage from './pages/Admin/Consultorios/ConsultorioAgregar';
import ConsultorioBuscarPage from './pages/Admin/Consultorios/ConsultorioBuscar';
import ConsultorioDetallePage from './pages/Admin/Consultorios/ConsultorioDetalle';
import ConsultorioEditarPage from './pages/Admin/Consultorios/ConsultorioEditar';
import ConsultoriosPage from './pages/Admin/Consultorios/Consultorios';
import UsuarioAgregarPage from './pages/Admin/Usuarios/UsuarioAgregar';
import UsuarioBuscarPage from './pages/Admin/Usuarios/UsuarioBuscar';
import UsuarioDetallePage from './pages/Admin/Usuarios/UsuarioDetalle';
import UsuarioEditarPage from './pages/Admin/Usuarios/UsuarioEditar';
import UsuariosPage from './pages/Admin/Usuarios/Usuarios';
import CitasAgregarPage from './pages/Citas/CitaAgregar';
import CitaBuscarPage from './pages/Citas/CitaBuscar';
import CitaPage from './pages/Citas/CitaDetalle';
import CitasPage from './pages/Citas/Citas';
import CitasBuscarNotificacion from './pages/Citas/CitasBuscarNotif';
import CitasEditarPage from './pages/Citas/CitasEditar';
import CitasNotificacionPage from './pages/Citas/CitasNotificacion';
import CertificadoPage from './pages/Evoluciones/Certificado';
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
import AboutPage from './pages/Otras/About';
import ErrorPage from './pages/Otras/Error';
import ErrorAutorizacionPage from './pages/Otras/ErrorAutorizacion';
import LoginPage from './pages/Otras/Login';
import MainPage from './pages/Otras/Main';
import RecuperarPass from './pages/Otras/RecuperarPass';
import PacienteAgregarPage from './pages/Pacientes/PacienteAgregar';
import PacienteBuscarPage from './pages/Pacientes/PacienteBuscar';
import PacienteDetallePage from './pages/Pacientes/PacienteDetalle';
import PacienteEditarPage from './pages/Pacientes/PacienteEditar';
import PacientesPage from './pages/Pacientes/Pacientes';
import PerfilActualizaPage from './pages/Perfil/ActualizarDatos';
import PerfilPassPage from './pages/Perfil/CambiarPass';
import PerfilPage from './pages/Perfil/Perfil';

function App() {
  return (
    <BrowserRouter>
      <IntlProvider locale={es_ES}>
        <Switch>
          {/* //pagina login */}
          <Route exact path="/" component={LoginPage} />
          {/* pagina para recuperar contraseña */}
          <Route exact path="/recuperar_pass" component={RecuperarPass} />
          {/* //pagina main */}
          <Route exact path="/main" component={MainPage} />
          {/* pagina de about */}
          <Route exact path="/about" component={AboutPage} />
          {/* paginas de perfil */}
          <Route exact path="/perfil/:user" component={PerfilPage} />
          <Route
            exact
            path="/perfil_actualizar/:user"
            component={PerfilActualizaPage}
          />
          <Route exact path="/perfil_pass/:user" component={PerfilPassPage} />

          {/* //paginas de pacientes */}
          <Route exact path="/pacientes" component={PacientesPage} />
          <Route
            exact
            path="/paciente/:pacienteId"
            component={PacienteDetallePage}
          />
          <Route
            exact
            path="/paciente_agregar"
            component={PacienteAgregarPage}
          />
          <Route
            exact
            path="/paciente_editar/:pacienteId"
            component={PacienteEditarPage}
          />
          <Route
            exact
            path="/paciente_buscar/:buscar"
            component={PacienteBuscarPage}
          />
          {/* //paginas de historias clinicas */}
          <Route exact path="/historias_clinicas" component={HCPage} />
          <Route
            exact
            path="/historia_clinica_agregar/:pacienteId"
            component={HCAgregarPage}
          />
          <Route
            exact
            path="/historia_clinica/:pacienteId"
            component={HCDetallePage}
          />
          <Route
            exact
            path="/historia_clinica_editar/:historiaId/:pacienteId"
            component={HCEditarPage}
          />
          <Route
            exact
            path="/historia_clinica_buscar/:buscar"
            component={HCBuscarPage}
          />
          {/* //paginas de evoluciones */}
          <Route
            exact
            path="/evolucion_agregar/:historiaId/:pacienteId"
            component={EvolucionAgregarPage}
          />
          <Route
            exact
            path="/evolucion_editar/:evolucionId/:historiaId"
            component={EvolucionEditarPage}
          />
          <Route
            exact
            path="/evolucion/:evolucionId/:historiaId"
            component={EvolucionPage}
          />
          <Route
            exact
            path="/evoluciones/:historiaId"
            component={EvolucionesPage}
          />
          <Route
            exact
            path="/evolucion_buscar/:historiaId/:fecha1/:fecha2"
            component={EvolucionBuscarPage}
          />
          {/* //pagina de receta */}
          <Route exact path="/receta/:evolucionId" component={RecetaPage} />
          {/* pagina de Certificado */}
          <Route
            exact
            path="/certificado/:evolucionId"
            component={CertificadoPage}
          />
          {/* //paginas de citas */}
          <Route exact path="/citas/:fecha/:view" component={CitasPage} />
          <Route
            exact
            path="/citas_buscar/:fecha1/:fecha2"
            component={CitaBuscarPage}
          />
          <Route
            exact
            path="/citas_notificacion/:fecha"
            component={CitasNotificacionPage}
          />
          <Route
            exact
            path="/citas__buscar_notificacion/:fecha1/:fecha2"
            component={CitasBuscarNotificacion}
          />
          <Route exact path="/cita_detalle/:citaId" component={CitaPage} />
          <Route
            exact
            path="/cita_agregar/:pacienteId"
            component={CitasAgregarPage}
          />
          <Route
            exact
            path="/cita_editar/:pacienteId/:citaId"
            component={CitasEditarPage}
          />
          {/* //páginas de admin usuarios*/}
          <Route exact path="/admin/usuarios" component={UsuariosPage} />
          <Route
            exact
            path="/admin/usuario_agregar"
            component={UsuarioAgregarPage}
          />
          <Route
            exact
            path="/admin/usuario/:usuarioId"
            component={UsuarioDetallePage}
          />
          <Route
            exact
            path="/admin/usuario_editar/:usuarioId"
            component={UsuarioEditarPage}
          />
          <Route
            exact
            path="/admin/usuarios_buscar/:buscar"
            component={UsuarioBuscarPage}
          />
          {/* //páginas de admin consultorios*/}
          <Route
            exact
            path="/admin/consultorios"
            component={ConsultoriosPage}
          />
          <Route
            exact
            path="/admin/consultorio_agregar"
            component={ConsultorioAgregarPage}
          />
          <Route
            exact
            path="/admin/consultorio/:consultorioId"
            component={ConsultorioDetallePage}
          />
          <Route
            exact
            path="/admin/consultorio_editar/:consultorioId"
            component={ConsultorioEditarPage}
          />
          <Route
            exact
            path="/admin/consultorios_buscar/:buscar"
            component={ConsultorioBuscarPage}
          />
          {/* Error Autorizacion */}
          <Route exact path="/error_auth" component={ErrorAutorizacionPage} />
          {/* Error page */}
          <Route component={ErrorPage} />
        </Switch>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
