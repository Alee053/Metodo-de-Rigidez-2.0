import {Route, Switch} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

import NavbarVigas from "./components/NavbarVigas";
import FooterBarVigas from "./components/FooterBarVigas";
import SeccionBarras from "./sections/SeccionBarrasVigas";
import SeccionMatrizTotal from "./sections/SeccionMatrizTotal";
import SeccionVectoresVigas from "./sections/SeccionVectoresVigas";
import SeccionEcuacionesVigas from "./sections/SeccionEcuacionesVigas";

import {Bar} from "./js/BarVigas";
import {solveTotalMatrix} from "../js/Utility";


export const VigasContext = React.createContext();

export default function VigasMain() {
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

  //ACTUALIZO LA VARIABLE QUE COMPRUEBA SI LOS DATOS SON VALIDOS
  useEffect(() => {
    setIsValidData(!!MainData.bars.length);
    MainSave.current = MainData;
  }, [MainData])

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
        new Bar(currentBar.E, currentBar.I, currentBar.L, currentBar.num),
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
        solvedEquations
      }}>
      <div className='grid grid-rows-min-3 h-full'>
        <NavbarVigas/>
        <Switch>
          <Route path='/vigas/barras'>
            <SeccionBarras/>
          </Route>
          <Route path='/vigas/matriz-total'>
            <SeccionMatrizTotal/>
          </Route>
          <Route path='/vigas/vectores'>
            <SeccionVectoresVigas/>
          </Route>
          <Route path='/vigas/ecuaciones'>
            <SeccionEcuacionesVigas/>
          </Route>
        </Switch>
        <FooterBarVigas/>
      </div>
    </VigasContext.Provider>
  );
}
