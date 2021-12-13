import React, {useContext, useEffect, useState} from "react";
import {VigasContext} from "../PorticosMain";
import Button from "../../components/templates/Button"
import {getEquations, solveAll} from "../js/Equations";

const {dialog, BrowserWindow} = window.require("@electron/remote")

export default function SeccionEcuacionesPorticos() {

  const {
    tempEquations,
    precision,
    solvedEquations,
    MainData,
    solvedData,
    setSolvedData,
    maxNum,
    dArray
  } = useContext(VigasContext)

  const [auxEquations, setAuxEquations] = useState([[], []])

  useEffect(() => {
    tryGetEquations()
  }, [maxNum])

  useEffect(() => {
    tryGetEquations()
    handleSolve()
  }, [precision])

  function handleSolve() {
    if (!tempEquations.current[0].length) return;
    const aux = JSON.parse(JSON.stringify(tempEquations.current[1]));
    try {
      const aux1 = solveAll(aux, precision, maxNum)
      solvedEquations.current = aux1[0];
      dArray.current = aux1[1];
    } catch (error) {
      const window = BrowserWindow.getFocusedWindow();

      dialog.showMessageBoxSync(window, {
        title: "Ecuaciones",
        buttons: ["Ok"],
        type: "warning",
        message: 'Ocurrio un error al resolver el sistema de ecuaciones, revise datos : "'
          + error.message + '"',
      })

      return;

    }
    
    console.log(solvedData);
    setSolvedData(solvedData);
    setAuxEquations([tempEquations.current[0], solvedEquations.current])
  }

  function tryGetEquations() {
    if (!MainData.vectores[0].length) return;

    for (let i = 0; i < maxNum; i++)
      if (!MainData.vectores[0][i] || !MainData.vectores[1][i]) return;

    tempEquations.current = getEquations(solvedData.totalMatrix, MainData.vectores[0], MainData.vectores[1], precision);
    setAuxEquations([tempEquations.current[0], solvedEquations.current])
  }

  return <div className={"grid grid-cols-custom-3"}>
    <div className={"grid grid-rows-min-2 gap-10 p-5 overflow-y-scroll"}>
      <div><h1 className={"text-2xl"}>Sistema de Ecuaciones</h1>
        <hr/>
        <br/>
        <ul>
          {auxEquations[0].map((eq) => {
            return <li key={Math.random()} className={"text-lg"}>{eq}</li>
          })
          }
        </ul>
      </div>

      {auxEquations[0].length ?
        <Button styles={"border-white border-2 h-20 "} func={handleSolve}>Resolver</Button> :
        <h1>Datos invalidos o insuficientes</h1>}


    </div>
    <div className={"w-1 bg-white"}/>
    <div className={"p-5 overflow-y-scroll"}>
      <h1 className={"text-2xl"}>Resultados</h1>
      <hr/>
      <br/>
      <ul>
        {auxEquations[1].map((eq, id) => {
          return <li key={id} className={"text-lg"}>{eq}</li>
        })
        }
      </ul>

    </div>
  </div>
}