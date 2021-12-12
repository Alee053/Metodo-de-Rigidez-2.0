import React, {useContext} from "react";
import {round} from "../../js/Utility";
import {VigasContext} from "../CerchasMain";
import {Redirect} from "react-router-dom";

const {dialog, BrowserWindow} = window.require("@electron/remote")

export default function SeccionFuerzasCerchas() {
  const {solvedData, precision, solvedEquations} = useContext(VigasContext);
  if (solvedEquations.current.length) {
    return <div className={"p-5"}>
      <h1 className={"text-3xl"}>Fuerzas Internas</h1>
      <hr/>
      <div className={"grid p-5"}>
        <div>
          {solvedData.bars.map((bar, index) => {
            return <h2 key={index} className={"text-2xl"}>{"qF"}<p
              className={"inline-block text-sm"}>{index + 1}</p>{"=" + round(bar.qf, precision)}</h2>
          })}
        </div>
      </div>
    </div>
  }

  const window = BrowserWindow.getFocusedWindow();

  dialog.showMessageBoxSync(window, {
    title: "Datos Faltantes",
    buttons: ["Ok"],
    type: "warning",
    message: "Resuelva el sistema de ecuaciones en la pestaña de Reacciones y Desplazamientos",
  });

  return <Redirect to={"/cerchas/barras"}/>
}