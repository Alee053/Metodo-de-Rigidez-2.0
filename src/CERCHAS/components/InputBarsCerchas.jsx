import {useContext, useRef, useState} from "react";

import {VigasContext} from "../CerchasMain";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

export default function InputBarsCerchas() {
  const {MainData, setMainData} = useContext(VigasContext);

  const [isValid, setIsValid] = useState(false);

  const inputLy = useRef(null);
  const inputLx = useRef(null);
  const inputA = useRef(null);
  const inputE = useRef(null);
  const inputL = useRef(null);
  const inputNum1 = useRef(null);
  const inputNum2 = useRef(null);
  const inputNum3 = useRef(null);
  const inputNum4 = useRef(null);

  function checkInputs() {
    const iLx = inputLx.current.value;
    const iLy = inputLy.current.value;
    const iA = inputA.current.value;
    const iE = inputE.current.value;
    const iL = inputL.current.value;
    const i1 = inputNum1.current.value;
    const i2 = inputNum2.current.value;
    const i3 = inputNum3.current.value;
    const i4 = inputNum4.current.value;

    if (iLx && iLy &&
      iA && iE && iL && i1 && i2 && i3 && i4
    )
      setIsValid(true);
    else
      setIsValid(false);
  }

  function addBar() {
    const iLx = inputLx.current.value;
    const iLy = inputLy.current.value;
    const iA = inputA.current.value;
    const iE = inputE.current.value;
    const iL = inputL.current.value;
    const i1 = inputNum1.current.value;
    const i2 = inputNum2.current.value;
    const i3 = inputNum3.current.value;
    const i4 = inputNum4.current.value;

    const newMainData = {
      ...MainData,
      bars: [...MainData.bars, {lx: iLx, ly: iLy, A: iA, E: iE, L: iL, num: [i1, i2, i3, i4]}],
    };
    setMainData(newMainData);

    inputLx.current.value =
      inputLy.current.value =
        inputA.current.value =
          inputE.current.value =
            inputL.current.value =
              inputNum1.current.value =
                inputNum2.current.value =
                  inputNum3.current.value =
                    inputNum4.current.value =
                      "";
    setIsValid(false);

    console.log(newMainData);
  }

  return (
    <div className='grid grid-rows-2 gap-2 bg-white bg-opacity-5 p-10 pb-6 rounded-2xl border-2 border-gray-300 '>
      <div onChange={checkInputs}>
        <h2 className='inline-block text-xl'>λx:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputLx}/>
        <h2 className='inline-block text-xl'>λy:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputLy}/>
        <h2 className='inline-block text-xl'>A:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputA}/>
        <h2 className='inline-block text-xl'>E:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputE}/>
        <h2 className='inline-block text-xl'>L:</h2>
        <Input styles='w-40 inline-block mx-5' refe={inputL}/>
      </div>
      <div className='grid grid-cols-2' onChange={checkInputs}>
        <div>
          <h2 className='inline-block text-xl'>Numeracion:</h2>
          <Input styles='w-10 inline-block ml-2' refe={inputNum1}/>
          <Input styles='w-10 inline-block ml-2' refe={inputNum2}/>
          <Input styles='w-10 inline-block ml-2' refe={inputNum3}/>
          <Input styles='w-10 inline-block ml-2' refe={inputNum4}/>
        </div>
        <Button
          styles='w-min justify-self-center border-2'
          isDisabled={!isValid}
          func={addBar}>
          Añadir
        </Button>
      </div>
    </div>
  );
}
