import React, {useContext} from "react";

import InputBarsCerchas from "../components/InputBarsCerchas";
import SingleBarCerchas from "../components/SingleBarCerchas";
import {Bar} from "../js/BarCerchas";

import {VigasContext} from "../CerchasMain";

export default function SeccionBarras() {
  const {MainData} = useContext(VigasContext);

  return (
    <div className='w-full grid grid-rows-min-2 place-items-center p-10 gap-10 overflow-y-scroll'>
      <InputBarsCerchas/>
      <div className='grid gap-10 self-start'>
        {MainData.bars.map((bar, index) => {
          const newBar = new Bar(bar.lx, bar.ly, bar.A, bar.E, bar.L, bar.num);
          newBar.solveMatrix();
          return <SingleBarCerchas key={Math.random()} bar={newBar} id={index}/>;
        })}
      </div>
    </div>
  );
}
