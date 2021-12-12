import {Route, Switch} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

import NavbarCerchas from "./components/NavbarCerchas";
import FooterBarVigas from "./components/FooterBarCerchas";
import SeccionBarras from "./sections/SeccionBarrasCerchas";
import SeccionMatrizTotalCerchas from "./sections/SeccionMatrizTotalCerchas";
import SeccionVectoresCerchas from "./sections/SeccionVectoresCerchas";
import SeccionEcuacionesCerchas from "./sections/SeccionEcuacionesCerchas";

import {Bar} from "./js/BarCerchas";
import {solveTotalMatrix} from "../js/Utility";
import SeccionFuerzasCerchas from "./sections/SeccionFuerzasCerchas";


export const VigasContext = React.createContext();

export default function CerchasMain() {
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
        new Bar(currentBar.lx, currentBar.ly, currentBar.A, currentBar.E, currentBar.L, currentBar.num),
      );
      newSolvedData.bars[i].solveMatrix();
      newSolvedData.bars[i].solveQf(dArray.current);
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
        <NavbarCerchas/>
        <Switch>
          <Route path='/cerchas/barras'>
            <SeccionBarras/>
          </Route>
          <Route path='/cerchas/matriz-total'>
            <SeccionMatrizTotalCerchas/>
          </Route>
          <Route path='/cerchas/vectores'>
            <SeccionVectoresCerchas/>
          </Route>
          <Route path='/cerchas/reacciones'>
            <SeccionEcuacionesCerchas/>
          </Route>
          <Route path='/cerchas/fuerzas'>
            <SeccionFuerzasCerchas/>
          </Route>
        </Switch>
        <FooterBarVigas/>
      </div>
    </VigasContext.Provider>
  );
}
