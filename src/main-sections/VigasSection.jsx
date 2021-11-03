import { Route, Switch } from "react-router-dom";

import NavbarVigas from "../sections/NavbarVigas";
import Footerbar from "../sections/Footerbar";
import SeccionBarras from "../sections/SeccionBarrasVigas";

export default function VigasSection() {
  return (
    <div className='grid grid-rows-min-3 h-full'>
      <NavbarVigas />
      <Switch>
        <Route path='/vigas/barras'>
          <SeccionBarras />
        </Route>
        <Route path='/vigas/matriz-total'>
          <h1>Matriz</h1>
        </Route>
        <Route path='/vigas/vectores'>
          <h1>Vectores</h1>
        </Route>
        <Route path='/vigas/ecuaciones'>
          <h1>Ecuaciones</h1>
        </Route>
      </Switch>
      <Footerbar />
    </div>
  );
}
