import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import PacienteAgregarPage from './pages/PacienteAgregar';
import PacienteDetallePage from './pages/PacienteDetalle';
import PacientesPage from './pages/Pacientes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/pacientes' component={PacientesPage} />
        <Route
          exact
          path='/paciente/:pacienteId'
          component={PacienteDetallePage}
        />
        <Route exact path='/paciente' component={PacienteAgregarPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
