import {HashRouter as Router, Redirect, Route, Switch,} from "react-router-dom";

import VigasMain from "./VIGAS/VigasMain";
import CerchasMain from "./CERCHAS/CerchasMain";

//TODO ARREGLAR ROUTES

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/cerchas/barras'/>
        </Route>
        <Route path='/home'>
          <Redirect to='/cerchas/barras'/>
          <h1>Home</h1>
        </Route>
        <Route path='/vigas'>
          <VigasMain/>
        </Route>
        <Route path='/cerchas'>
          <CerchasMain/>
        </Route>
        <Route path='*'>
          <Redirect to='/home'/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
