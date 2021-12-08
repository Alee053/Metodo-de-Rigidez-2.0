import React, {createRef, useContext, useEffect, useState} from "react";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import {VigasContext} from "../VigasMain";
import {Redirect} from "react-router-dom";

const {dialog, BrowserWindow} = window.require("@electron/remote");

export default function SeccionVectoresVigas() {
  let {isValidData, MainData, maxNum, MainSave} = useContext(VigasContext);
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
    setQRefs((qRefs) => Array(maxNum).fill().map((_, i) => qRefs[i] || createRef()))
    setDRefs((dRefs) => Array(maxNum).fill().map((_, i) => dRefs[i] || createRef()))

  }, [maxNum])


  useEffect(() => {

    setTimeout(() => {
      console.log(qRefs);
      if (qRefs.length && MainSave.current.vectores.length) {
        if (MainSave.current.vectores[0].length) {
          for (let i = 0; i < MainSave.current.vectores[0].length; i++) {
            qRefs[i].current.value = MainSave.current.vectores[0][i];
            dRefs[i].current.value = MainSave.current.vectores[1][i];
          }
        }
      }
    }, 0)
  }, [qRefs])


  function updateVectors() {

    for (let i = 0; i < maxNum; i++)
      if (!qRefs[i].current.value || !dRefs[i].current.value) return;

    MainData = {
      ...MainData, vectores: [
        qRefs.map((val, i) => {
          return val.current.value
        })
        , dRefs.map((val, i) => {
          return val.current.value
        })]
    }
    MainSave.current = MainData;
  }

  return isValidData ? (
      <div className='overflow-y-scroll grid grid-cols-3 place-items-center p-10' onChange={updateVectors}>
        <table className='justify-self-end'>
          <thead>
          <tr>
            <th>
              <h1 className='text-5xl '>Q</h1>
            </th>
          </tr>
          </thead>
          <tbody>
          {[...Array(maxNum)].map((_, i) => {
            return (<tr key={Math.random()}>
              <td className='p-1 w-32 content-center justify-center'>
                <Input
                  styles='h-full w-full rounded-xl'
                  refe={qRefs[i]}
                />
              </td>
            </tr>);

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
          {[...Array(maxNum)].map((_, i) => {
            return (
              <tr key={Math.random()}>
                <td className='p-1 w-32 content-center justify-center'>
                  <Input
                    styles='h-full w-full rounded-xl'
                    refe={dRefs[i]}
                  />
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

    ) :
    <Redirect to="/vigas/barras"/>;
}
