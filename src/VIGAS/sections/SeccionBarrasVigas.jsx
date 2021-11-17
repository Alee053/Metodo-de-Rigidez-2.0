import { useContext, useEffect } from "react";

import InputBarsVigas from "../components/InputBarsVigas";
import SingleBarVigas from "../components/SingleBarVigas";
import { Bar } from "../js/BarVigas";

import { VigasContext } from "../VigasMain";

export default function SeccionBarras() {
  const { MainData } = useContext(VigasContext);
  const bars = MainData.bars;

  return (
    <div className='w-full grid grid-rows-min-2 place-items-center p-10 gap-10 overflow-y-scroll'>
      <InputBarsVigas />
      <div className='grid gap-10 self-start'>
        {bars.map((bar, index) => {
          const newBar = new Bar(bar.E, bar.I, bar.L, bar.num);
          newBar.solveMatrix();
          return <SingleBarVigas key={index} bar={newBar} id={index} />;
        })}
      </div>
    </div>
  );
}
