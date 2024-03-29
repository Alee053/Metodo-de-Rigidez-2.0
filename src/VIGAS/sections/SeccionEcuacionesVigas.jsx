import React, {useContext, useEffect, useState} from "react";
import {VigasContext} from "../VigasMain";
import Button from "../../components/templates/Button"
import {getEquations, solveAll} from "../js/Equations";

const {dialog, BrowserWindow} = window.require("@electron/remote")

export default function SeccionEcuacionesVigas() {

  const {tempEquations, precision, solvedEquations, MainData, solvedData, maxNum} = useContext(VigasContext)

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
      solvedEquations.current = solveAll(aux, precision);
    } catch (error) {
      const window = BrowserWindow.getFocusedWindow();

      dialog.showMessageBoxSync(window, {
        title: "Ecuaciones",
        buttons: ["Ok"],
        type: "warning",
        message: 'Ocurrio un error al resolver el sistema de ecuaciones, revise datos : "'
          + error.message + '"',
      })
      ;
    }


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