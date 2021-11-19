import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

import NavbarVigas from "./components/NavbarVigas";
import FooterBarVigas from "./components/FooterBarVigas";
import SeccionBarras from "./sections/SeccionBarrasVigas";
import SeccionMatrizTotal from "./sections/SeccionMatrizTotal";

import { Bar } from "./js/BarVigas";
import { solveTotalMatrix } from "../js/Utility";

export const VigasContext = React.createContext();

export default function VigasMain() {
  //* VARIABLES GLOBALES
  const [precision, setPrecision] = useState(3);
  let [MainData, setMainData] = useState({
    bars: [
      { E: 10, I: 4, L: 5, num: [1, 3, 4, 2] },
      { E: 2, I: 4, L: 13, num: [1, 5, 4, 2] },
    ],
    vectores: [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  });
  const [solvedData, setSolvedData] = useState({
    bars: [],
    totalMatrix: [],
    equations: [],
  });

  function updateSolvedData() {
    const newSolvedData = {
      bars: [],
      totalMatrix: [],
      equations: [],
    };
    const matrixArray = [];
    let maxNum = 0;
    for (let i = 0; i < MainData.bars.length; i++) {
      const currentBar = MainData.bars[i];
      maxNum = Math.max(maxNum, ...currentBar.num);
      newSolvedData.bars.push(
        new Bar(currentBar.E, currentBar.I, currentBar.L, currentBar.num),
      );
      newSolvedData.bars[i].solveMatrix();
      matrixArray.push(newSolvedData.bars[i].matrix);
    }
    newSolvedData.totalMatrix = solveTotalMatrix(matrixArray, maxNum);
    setSolvedData(newSolvedData);
  }

  useEffect(() => {
    updateSolvedData();
  }, [MainData]);

  return (
    <VigasContext.Provider
      value={{
        MainData,
        setMainData,
        precision,
        setPrecision,
        solvedData,
        updateSolvedData,
      }}>
      <div className='grid grid-rows-min-3 h-full'>
        <NavbarVigas />
        <Switch>
          <Route path='/vigas/barras'>
            <SeccionBarras />
          </Route>
          <Route path='/vigas/matriz-total'>
            <SeccionMatrizTotal />
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
