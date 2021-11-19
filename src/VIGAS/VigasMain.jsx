import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

import NavbarVigas from "./components/NavbarVigas";
import FooterBarVigas from "./components/FooterBarVigas";
import SeccionBarras from "./sections/SeccionBarrasVigas";

export const VigasContext = React.createContext();

export default function VigasMain() {
  //* VARIABLES GLOBALES
  const [MainData, setMainData] = useState({
    bars: [
      { E: 10, I: 4, L: 5, num: [1, 3, 4, 2] },
      { E: 2, I: 4, L: 13, num: [1, 5, 4, 2] },
    ],
    vectores: [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  });

  useEffect(() => {
    console.log(MainData);
  }, [MainData]);

  return (
    <VigasContext.Provider value={{ MainData, setMainData }}>
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
        <FooterBarVigas />
      </div>
    </VigasContext.Provider>
  );
}
