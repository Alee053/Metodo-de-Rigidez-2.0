import { useState, useContext, useRef } from "react";

import { VigasContext } from "../VigasMain";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

export default function InputBarsVigas() {
  const { MainData, setMainData } = useContext(VigasContext);

  const [isValid, setIsValid] = useState(false);

  const inputE = useRef(null);
  const inputI = useRef(null);
  const inputL = useRef(null);
  const inputNum1 = useRef(null);
  const inputNum2 = useRef(null);
  const inputNum3 = useRef(null);
  const inputNum4 = useRef(null);

  function checkInputs() {
    const iE = inputE.current.value;
    const iI = inputI.current.value;
    const iL = inputL.current.value;
    const i1 = inputNum1.current.value;
    const i2 = inputNum2.current.value;
    const i3 = inputNum3.current.value;
    const i4 = inputNum4.current.value;

    if (iE && iI && iL && i1 && i2 && i3 && i4) setIsValid(true);
    else setIsValid(false);
  }

  function addBar() {
    const iE = inputE.current.value;
    const iI = inputI.current.value;
    const iL = inputL.current.value;
    const i1 = inputNum1.current.value;
    const i2 = inputNum2.current.value;
    const i3 = inputNum3.current.value;
    const i4 = inputNum4.current.value;

    const newMainData = {
      ...MainData,
      bars: [...MainData.bars, { E: iE, I: iI, L: iL, num: [i1, i2, i3, i4] }],
    };
    setMainData(newMainData);

    inputE.current.value =
      inputI.current.value =
      inputL.current.value =
      inputNum1.current.value =
      inputNum2.current.value =
      inputNum3.current.value =
      inputNum4.current.value =
        "";
    setIsValid(false);
  }

  return (
    <div className='grid grid-rows-2 gap-2 bg-white bg-opacity-5 p-10 pb-6 rounded-2xl border-2 border-gray-300 '>
      <div onChange={checkInputs}>
        <h2 className='inline-block text-xl'>E:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputE} />
        <h2 className='inline-block text-xl'>I:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputI} />
        <h2 className='inline-block text-xl'>L:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputL} />
      </div>
      <div className='grid grid-cols-2' onChange={checkInputs}>
        <div>
          <h2 className='inline-block text-xl'>Numeracion:</h2>
          <Input styles='w-10 inline-block ml-2' refe={inputNum1} />
          <Input styles='w-10 inline-block ml-2' refe={inputNum2} />
          <Input styles='w-10 inline-block ml-2' refe={inputNum3} />
          <Input styles='w-10 inline-block ml-2' refe={inputNum4} />
        </div>
        <Button
          styles='w-min justify-self-center border-2'
          isDisabled={isValid ? false : true}
          func={addBar}>
          Añadir
        </Button>
      </div>
    </div>
  );
}
