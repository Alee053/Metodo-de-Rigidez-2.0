import {HashRouter as Router, Redirect, Route, Switch,} from "react-router-dom";

import VigasMain from "./VIGAS/VigasMain";
import CerchasMain from "./CERCHAS/CerchasMain";
import PorticosMain from "./PORTICOS/PorticosMain";
import MainMenu from "./MainMenu";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='home'/>
        </Route>
        <Route path='/home'>
          <MainMenu/>
        </Route>
        <Route path='/vigas'>
          <VigasMain/>
        </Route>
        <Route path='/cerchas'>
          <CerchasMain/>
        </Route>
        <Route path='/porticos'>
          <PorticosMain/>
        </Route>
        <Route path='*'>
          <Redirect to='/home'/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
