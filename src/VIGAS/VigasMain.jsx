import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

import NavbarVigas from "./components/NavbarVigas";
import FooterBarVigas from "./components/FooterBarVigas";
import SeccionBarras from "./sections/SeccionBarrasVigas";
import SeccionMatrizTotal from "./sections/SeccionMatrizTotal";
import SeccionVectoresVigas from "./sections/SeccionVectoresVigas";

import { Bar } from "./js/BarVigas";
import { solveTotalMatrix } from "../js/Utility";

export const VigasContext = React.createContext();

export default function VigasMain() {
  //* VARIABLES GLOBALES
  const [precision, setPrecision] = useState(3);
  const [MaxNum, setMaxNum] = useState(0);

  let [MainData, setMainData] = useState({
    bars: [],
    vectores: [[], []],
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
    setMaxNum(maxNum);
    newSolvedData.totalMatrix = solveTotalMatrix(matrixArray, maxNum);
    setSolvedData(newSolvedData);
  }

  useEffect(() => {
    updateSolvedData();
    console.log(MainData);
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
        MaxNum,
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
            <SeccionVectoresVigas />
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
