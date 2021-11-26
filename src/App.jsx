import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import VigasMain from "./VIGAS/VigasMain";

//TODO ARREGLAR ROUTES

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/vigas/barras' />
        </Route>
        <Route path='/home'>
          <Redirect to='/vigas/barras' />
          <h1>Home</h1>
        </Route>
        <Route path='/vigas'>
          <VigasMain />
        </Route>
        <Route path='*'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
