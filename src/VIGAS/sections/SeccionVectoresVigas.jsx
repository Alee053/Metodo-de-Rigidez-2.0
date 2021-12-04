import React, {createRef, useContext, useEffect, useState} from "react";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import {VigasContext} from "../VigasMain";
import {Redirect} from "react-router-dom";

const {dialog, BrowserWindow} = window.require("@electron/remote");

export default function SeccionVectoresVigas() {
  let {solvedData, isValidData, setMainData, MainData} = useContext(VigasContext);
  const [qRefs, setQRefs] = useState([]);
  const [dRefs, setDRefs] = useState([]);

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

  //ACTUALIZAR LOS INPUTS AL CAMBIAR DE DATOS
  useEffect(() => {
    if (!isValidData) return;
    setQRefs((qRefs) => Array(solvedData.totalMatrix.length - 1).fill().map((_, i) => qRefs[i] || createRef()))
    setDRefs((dRefs) => Array(solvedData.totalMatrix.length - 1).fill().map((_, i) => dRefs[i] || createRef()))
  }, [solvedData])

  function updateVectors() {
    setMainData({
      ...MainData, vectores: [
        qRefs.map((val, i) => {
          return val.current.value !== "" || MainData.vectores[0].length === 0
            ?
            val.current.value
            :
            MainData.vectores[0][i]
        })
        , dRefs.map((val, i) => {
          return val.current.value !== "" || MainData.vectores[0].length === 0
            ?
            val.current.value
            :
            MainData.vectores[1][i]
        })]
    })
  }

  return isValidData ? (
    <div
      className='overflow-y-scroll grid grid-cols-3 place-items-center p-10'
      onChange={updateVectors}>
      <table className='justify-self-end'>
        <thead>
        <tr>
          <th>
            <h1 className='text-5xl '>Q</h1>
          </th>
        </tr>
        </thead>
        <tbody>
        {solvedData.totalMatrix.map((_, i) => {
          return i !== 0 ? (
            <tr key={Math.random()}>
              <td className='p-1 w-32 content-center justify-center'>
                <Input
                  styles='h-full w-full rounded-xl'
                  refe={qRefs[i - 1]}
                  placeholder={MainData.vectores[0].length > 0 ? MainData.vectores[0][i - 1] : ""}
                />
              </td>
            </tr>
          ) : null;
        })}
        </tbody>
      </table>
      <Button styles='h-40 w-40 bg-white bg-opacity-20 rounded-3xl'>
        Resolver
      </Button>
      <table className='justify-self-start'>
        <thead>
        <tr>
          <th>
            <h1 className='text-5xl'>D</h1>
          </th>
        </tr>
        </thead>
        <tbody>
        {solvedData.totalMatrix.map((_, i) => {
          return i !== 0 ? (
            <tr key={Math.random()}>
              <td className='p-1 w-32 content-center justify-center'>
                <Input
                  styles='h-full w-full rounded-xl'
                  refe={dRefs[i - 1]}
                  placeholder={MainData.vectores[0].length > 0 ? MainData.vectores[1][i - 1] : ""}
                />
              </td>
            </tr>
          ) : null;
        })}
        </tbody>
      </table>
    </div>
  ) : <Redirect to="/vigas/barras"/>;
}
