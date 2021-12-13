import React, {useContext} from "react";

import InputBarsCerchas from "../components/InputBarsPorticos";
import SingleBarPorticos from "../components/SingleBarPorticos";
import {Bar} from "../js/BarPorticos";

import {VigasContext} from "../PorticosMain";

export default function SeccionBarras() {
  const {MainData} = useContext(VigasContext);

  return (
    <div className='w-full grid grid-rows-min-2 place-items-center p-10 gap-10 overflow-y-scroll'>
      <InputBarsCerchas/>
      <div className='grid gap-10 self-start'>
        {MainData.bars.map((bar, index) => {
          const newBar = new Bar(bar.lx, bar.ly, bar.A, bar.E, bar.I, bar.L, bar.num);
          newBar.solveMatrix();
          return <SingleBarPorticos key={Math.random()} bar={newBar} id={index}/>;
        })}
      </div>
    </div>
  );
}
