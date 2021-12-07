import React, {useContext, useEffect} from "react";
import {Redirect} from "react-router-dom/cjs/react-router-dom.min";

import {round} from "../../js/Utility";

import {VigasContext} from "../VigasMain";

const {dialog, BrowserWindow} = window.require("@electron/remote");

function SeccionMatrizTotal() {
  //IMPORTO VARIABLES GLOBALES
  const {solvedData, precision, updateSolvedData, isValidData} =
    useContext(VigasContext);

  //PUEDE Q ESTO SEA LENTO
  useEffect(updateSolvedData, []);

  //COMPROBAR DATOS VALIDOS
  useEffect(() => {
    if (!isValidData) {
      const window = BrowserWindow.getFocusedWindow();

      dialog.showMessageBoxSync(window, {
        title: "Datos Invalidos",
        buttons: ["Ok"],
        type: "warning",
        message: "Ingrese por lo menos una barra",
      });
    }
  }, []);

  return (
    <>
      {isValidData ? (
        <div className='overflow-y-scroll grid place-items-center'>
          <table>
            <tbody>
            {solvedData.totalMatrix.map((row, i) => {
              return (
                <tr key={Math.random()}>
                  {row.map((cell, j) => {
                    if (i === 0 || j === 0) {
                      if (i === 0 && j === 0)
                        return <th key={Math.random()}></th>;
                      return <th key={Math.random()}>{cell}</th>;
                    } else {
                      return (
                        <td key={Math.random()}>{round(cell, precision)}</td>
                      );
                    }
                  })}
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      ) : (
        <Redirect to='/vigas/barras'/>
      )}
    </>
  );
}

export default SeccionMatrizTotal;
