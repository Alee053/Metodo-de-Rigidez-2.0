import React, { useContext, useEffect, useRef } from "react";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import { VigasContext } from "../VigasMain";

export default function SeccionVectoresVigas() {
  const { MaxNum, MainData, setMainData } = useContext(VigasContext);

  const qRefs = useRef([]);
  const dRefs = useRef([]);

  useEffect(() => {
    while (qRefs.length > MaxNum) {
      qRefs.current.pop();
      dRefs.current.pop();
    }
  }, [MaxNum]);
  //TODO ARREGLAR
  useEffect(() => {
    for (let i = 0; i < MaxNum; i++) {
      qRefs.current[i].placeholder = MainData.vectores[0][i];
      dRefs.current[i].placeholder = MainData.vectores[1][i];
    }
  }, []);

  function updateVectores() {
    for (let i = 0; i < MaxNum; i++)
      if (!qRefs.current[i].value || !dRefs.current[i].value) return;
    const newVectores = [[], []];
    for (let i = 0; i < MaxNum; i++) {
      newVectores[0].push(parseFloat(qRefs.current[i].value));
      newVectores[1].push(parseFloat(dRefs.current[i].value));
    }
    setMainData({ ...MainData, vectores: newVectores });
  }

  return (
    <div
      className='overflow-y-scroll grid grid-cols-3 place-items-center p-10'
      onChange={updateVectores}>
      <table className='justify-self-end'>
        <thead>
          <tr>
            <th>
              <h1 className='text-5xl'>Q</h1>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(MaxNum)].map((num, i) => {
            return (
              <tr key={Math.random()}>
                <td className='p-1 w-32 content-center justify-center'>
                  <Input
                    styles='h-full w-full rounded-xl'
                    refe={(elem) => qRefs.current.push(elem)}
                  />
                </td>
              </tr>
            );
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
              <h1 className='text-5xl'>D</h1>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(MaxNum)].map((num, i) => {
            return (
              <tr key={Math.random()}>
                <td className='p-1 w-32 content-center justify-center'>
                  <Input
                    styles='h-full w-full rounded-xl'
                    refe={(elem) => dRefs.current.push(elem)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
