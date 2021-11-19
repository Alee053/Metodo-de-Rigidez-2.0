import React, { useContext, useEffect } from "react";

import { round } from "../../js/Utility";

import { VigasContext } from "../VigasMain";

function SeccionMatrizTotal() {
  const { solvedData, precision, updateSolvedData } = useContext(VigasContext);
  //!PUEDE Q ESTO SEA LENTO
  useEffect(updateSolvedData, []);
  return (
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
  );
}

export default SeccionMatrizTotal;
