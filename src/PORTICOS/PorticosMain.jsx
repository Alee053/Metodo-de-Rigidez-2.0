import {Route, Switch} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

import NavbarPorticos from "./components/NavbarPorticos";
import FooterBarVigas from "./components/FooterBarPorticos";
import SeccionBarras from "./sections/SeccionBarrasPorticos";
import SeccionMatrizTotalPorticos from "./sections/SeccionMatrizTotalPorticos";
import SeccionVectoresPorticos from "./sections/SeccionVectoresPorticos";
import SeccionEcuacionesPorticos from "./sections/SeccionEcuacionesPorticos";

import {Bar} from "./js/BarPorticos";
import {solveTotalMatrix} from "../js/Utility";


export const VigasContext = React.createContext();

export default function PorticosMain() {
  //VARIABLES GLOBALES
  const [precision, setPrecision] = useState(3);
  let [MainData, setMainData] = useState({
    bars: [],
    vectores: [[], []],
  });
  const MainSave = useRef({
    bars: [],
    vectores: [[], []],
  });
  const [solvedData, setSolvedData] = useState({
    bars: [],
    totalMatrix: [],
  });
  const [isValidData, setIsValidData] = useState(false);
  const [maxNum, setMaxNum] = useState(0);
  const tempEquations = useRef([[], []]);
  const solvedEquations = useRef([])
  const dArray = useRef([]);

  //ACTUALIZO LA VARIABLE QUE COMPRUEBA SI LOS DATOS SON VALIDOS
  useEffect(() => {
    setIsValidData(!!MainData.bars.length);
    MainSave.current = MainData;
  }, [MainData])

  useEffect(() => {
    console.log(solvedData);
  }, [solvedData])

  //RESUELVE LAS BARRAS
  function updateSolvedData() {
    const newSolvedData = {
      bars: [],
      totalMatrix: [],
    };
    const matrixArray = [];
    let max = 0;
    for (let i = 0; i < MainData.bars.length; i++) {
      const currentBar = MainData.bars[i];
      max = Math.max(max, ...currentBar.num);
      newSolvedData.bars.push(
        new Bar(currentBar.lx, currentBar.ly, currentBar.A, currentBar.E, currentBar.I, currentBar.L, currentBar.num),
      );
      newSolvedData.bars[i].solveMatrix();
      matrixArray.push(newSolvedData.bars[i].matrix);
    }
    newSolvedData.totalMatrix = solveTotalMatrix(matrixArray, max);
    setSolvedData(newSolvedData);

    if (max !== maxNum) setMaxNum(max);

  }

  //ACTUALIZA DATOS RESULETOS CADA VEZ QUE SE MODIFIQUEN LOS DATOS
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
        isValidData,
        maxNum,
        MainSave,
        setSolvedData,
        tempEquations,
        solvedEquations,
        dArray
      }}>
      <div className='grid grid-rows-min-3 h-full'>
        <NavbarPorticos/>
        <Switch>
          <Route path='/porticos/barras'>
            <SeccionBarras/>
          </Route>
          <Route path='/porticos/matriz-total'>
            <SeccionMatrizTotalPorticos/>
          </Route>
          <Route path='/porticos/vectores'>
            <SeccionVectoresPorticos/>
          </Route>
          <Route path='/porticos/reacciones'>
            <SeccionEcuacionesPorticos/>
          </Route>
        </Switch>
        <FooterBarVigas/>
      </div>
    </VigasContext.Provider>
  );
}
