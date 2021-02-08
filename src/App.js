import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/Main';
import PacientesPage from './pages/Pacientes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/pacientes' component={PacientesPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
