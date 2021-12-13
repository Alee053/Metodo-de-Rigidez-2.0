import {useContext, useRef, useState} from "react";

import {Bar} from "../js/BarPorticos";
import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import {VigasContext} from "../PorticosMain";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

import {round} from "../../js/Utility";

export default function SingleBarPorticos({bar = new Bar(), id}) {
  //LET PARA EVITAR RERENDER EN EDIT
  let {setMainData, MainData, precision} = useContext(VigasContext);

  const [lx, setLx] = useState(bar.lx);
  const [ly, setLy] = useState(bar.ly);
  const [A, setA] = useState(bar.A);
  const [E, setE] = useState(bar.E);
  const [I, setI] = useState(bar.I);
  const [L, setL] = useState(bar.L);
  const [num, setNum] = useState(bar.num);
  const [matrix, setMatrix] = useState(bar.matrix);

  const inputLx = useRef(null);
  const inputLy = useRef(null);
  const inputA = useRef(null);
  const inputE = useRef(null);
  const inputI = useRef(null);
  const inputL = useRef(null);
  const inputNum1 = useRef(null);
  const inputNum2 = useRef(null);
  const inputNum3 = useRef(null);
  const inputNum4 = useRef(null);
  const inputNum5 = useRef(null);
  const inputNum6 = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleMatrix = () => setIsOpen(!isOpen);
  const toggleEdit = () => setIsEdit(!isEdit);

  const applyChanges = () => {
    if (!isEdit) return;
    const iLx = inputLy.current.value;
    const iLy = inputLx.current.value;
    const iA = inputA.current.value;
    const iE = inputE.current.value;
    const iI = inputE.current.value;
    const iL = inputL.current.value;
    const i1 = inputNum1.current.value;
    const i2 = inputNum2.current.value;
    const i3 = inputNum3.current.value;
    const i4 = inputNum4.current.value;
    const i5 = inputNum4.current.value;
    const i6 = inputNum4.current.value;

    const newBar = new Bar(
      iLx !== "" ? iLx : lx,
      iLy !== "" ? iLy : ly,
      iA !== "" ? iA : A,
      iE !== "" ? iE : E,
      iI !== "" ? iI : I,
      iL !== "" ? iL : L,
      [
        i1 !== "" ? i1 : num[0],
        i2 !== "" ? i2 : num[1],
        i3 !== "" ? i3 : num[2],
        i4 !== "" ? i4 : num[3],
        i5 !== "" ? i5 : num[4],
        i6 !== "" ? i6 : num[5],
      ],
    );
    newBar.solveMatrix();

    setLx(newBar.lx);
    setLy(newBar.ly);
    setA(newBar.A);
    setE(newBar.E);
    setI(newBar.I);
    setL(newBar.L);
    setNum(newBar.num);
    setMatrix(newBar.matrix);

    bar = newBar;
    const newBars = MainData.bars;
    newBars[id] = {lx: bar.lx, ly: bar.ly, A: bar.A, E: bar.E, I: bar.I, L: bar.L, num: bar.num};

    //EVITA RERENDER
    MainData = {...MainData, bars: newBars};
  };

  function removeBar() {
    setMainData({
      ...MainData,
      bars: MainData.bars.filter((a, index) => id !== index),
    });
  }

  return (
    <div
      className='bg-white justify-items-center bg-opacity-10 border-2 rounded-2xl p-5 pl-10 pb-0 grid grid-rows-3 place-items-center justify-self-center self-start relative w-max'>
      <strong className={"place-self-start text-xl"}>Barra {id + 1}</strong>
      <div className=' grid grid-cols-min-7 gap-20 place-items-center '>
        <h2 className='text-center text-xl font-bold'>
          λx:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={lx} refe={inputLx}/>
          ) : (
            lx
          )}
        </h2>
        <h2 className='text-center text-xl font-bold'>
          λy:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={ly} refe={inputLy}/>
          ) : (
            ly
          )}
        </h2>
        <h2 className='text-center text-xl font-bold'>
          A:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={A} refe={inputA}/>
          ) : (
            A
          )}
        </h2>
        <h2 className='text-center text-xl font-bold'>
          E:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={E} refe={inputE}/>
          ) : (
            E
          )}
        </h2>
        <h2 className='text-center text-xl font-bold'>
          I:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={I} refe={inputI}/>
          ) : (
            I
          )}
        </h2>
        <h2 className='text-center text-xl font-bold'>
          L:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={L} refe={inputL}/>
          ) : (
            L
          )}
        </h2>
        <div>
          <Button
            styles='border-2'
            func={() => {
              toggleEdit();
              applyChanges();
            }}>
            {!isEdit ? "Editar" : "Aplicar"}
          </Button>
          <Button styles='border-2' func={removeBar}>
            Eliminar
          </Button>
        </div>
      </div>
      {isEdit ? (
        <div className='place-self-start mx-7'>
          <h2 className='inline-block text-xl'>Numeracion:</h2>
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[0]}
            refe={inputNum1}
          />
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[1]}
            refe={inputNum2}
          />
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[2]}
            refe={inputNum3}
          />
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[3]}
            refe={inputNum4}
          />
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[4]}
            refe={inputNum5}
          />
          <Input
            styles='w-10 inline-block ml-2'
            placeholder={num[5]}
            refe={inputNum6}
          />
        </div>
      ) : null}
      <button className='h-full w-full mt-1' onClick={toggleMatrix}>
        <FontAwesomeIcon className='text-lg' icon={faAngleDown}/>
      </button>

      {isOpen ? (
        <>
          <div className='h-0.5 w-full bg-white'/>
          <div className='p-5'>
            <table>
              <tbody>
              <tr>
                <th></th>
                <th>{num[0]}</th>
                <th>{num[1]}</th>
                <th>{num[2]}</th>
                <th>{num[3]}</th>
                <th>{num[4]}</th>
                <th>{num[5]}</th>
              </tr>
              <tr>
                <th>{num[0]}</th>
                <td>{round(matrix[num[0]][num[0]], precision)}</td>
                <td>{round(matrix[num[0]][num[1]], precision)}</td>
                <td>{round(matrix[num[0]][num[2]], precision)}</td>
                <td>{round(matrix[num[0]][num[3]], precision)}</td>
                <td>{round(matrix[num[0]][num[4]], precision)}</td>
                <td>{round(matrix[num[0]][num[5]], precision)}</td>
              </tr>
              <tr>
                <th>{num[1]}</th>
                <td>{round(matrix[num[1]][num[0]], precision)}</td>
                <td>{round(matrix[num[1]][num[1]], precision)}</td>
                <td>{round(matrix[num[1]][num[2]], precision)}</td>
                <td>{round(matrix[num[1]][num[3]], precision)}</td>
                <td>{round(matrix[num[1]][num[4]], precision)}</td>
                <td>{round(matrix[num[1]][num[5]], precision)}</td>
              </tr>
              <tr>
                <th>{num[2]}</th>
                <td>{round(matrix[num[2]][num[0]], precision)}</td>
                <td>{round(matrix[num[2]][num[1]], precision)}</td>
                <td>{round(matrix[num[2]][num[2]], precision)}</td>
                <td>{round(matrix[num[2]][num[3]], precision)}</td>
                <td>{round(matrix[num[2]][num[4]], precision)}</td>
                <td>{round(matrix[num[2]][num[5]], precision)}</td>
              </tr>
              <tr>
                <th>{num[3]}</th>
                <td>{round(matrix[num[3]][num[0]], precision)}</td>
                <td>{round(matrix[num[3]][num[1]], precision)}</td>
                <td>{round(matrix[num[3]][num[2]], precision)}</td>
                <td>{round(matrix[num[3]][num[3]], precision)}</td>
                <td>{round(matrix[num[3]][num[4]], precision)}</td>
                <td>{round(matrix[num[3]][num[5]], precision)}</td>
              </tr>
              <tr>
                <th>{num[4]}</th>
                <td>{round(matrix[num[4]][num[0]], precision)}</td>
                <td>{round(matrix[num[4]][num[1]], precision)}</td>
                <td>{round(matrix[num[4]][num[2]], precision)}</td>
                <td>{round(matrix[num[4]][num[3]], precision)}</td>
                <td>{round(matrix[num[4]][num[4]], precision)}</td>
                <td>{round(matrix[num[4]][num[5]], precision)}</td>
              </tr>
              <tr>
                <th>{num[5]}</th>
                <td>{round(matrix[num[5]][num[0]], precision)}</td>
                <td>{round(matrix[num[5]][num[1]], precision)}</td>
                <td>{round(matrix[num[5]][num[2]], precision)}</td>
                <td>{round(matrix[num[5]][num[3]], precision)}</td>
                <td>{round(matrix[num[5]][num[4]], precision)}</td>
                <td>{round(matrix[num[5]][num[5]], precision)}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
