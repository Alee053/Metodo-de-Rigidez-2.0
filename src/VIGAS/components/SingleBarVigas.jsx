import { useState, useRef } from "react";

import { Bar } from "../js/BarVigas";
import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function SingleBarVigas({ bar = new Bar() }) {
  const [E, setE] = useState(bar.E);
  const [I, setI] = useState(bar.I);
  const [L, setL] = useState(bar.L);
  const [num, setNum] = useState(bar.num);
  const [matrix, setMatrix] = useState(bar.matrix);

  const inputE = useRef(null);
  const inputI = useRef(null);
  const inputL = useRef(null);
  const inputNum1 = useRef(null);
  const inputNum2 = useRef(null);
  const inputNum3 = useRef(null);
  const inputNum4 = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleMatrix = () => setIsOpen(!isOpen);
  const toggleEdit = () => setIsEdit(!isEdit);

  const applyChanges = () => {};

  return (
    <div className='bg-white justify-items-center bg-opacity-10 border-2 rounded-2xl p-5 pb-0 grid grid-rows-2 place-items-center self-start relative'>
      <div className=' grid grid-cols-4 place-items-center '>
        <h2 className='w-56 text-center text-xl font-bold'>
          E:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={E} refe={inputE} />
          ) : (
            E
          )}
        </h2>
        <h2 className='w-56 text-center text-xl font-bold'>
          I:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={I} refe={inputI} />
          ) : (
            I
          )}
        </h2>
        <h2 className='w-56 text-center text-xl font-bold'>
          L:{" "}
          {isEdit ? (
            <Input styles='mx-2 w-40' placeholder={L} refe={inputL} />
          ) : (
            L
          )}
        </h2>
        <div>
          <Button styles='border-2' func={toggleEdit}>
            {!isEdit ? "Editar" : "Aplicar"}
          </Button>
          <Button styles='border-2'>Eliminar</Button>
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
        </div>
      ) : null}
      <button className='h-full w-full mt-1' onClick={toggleMatrix}>
        <FontAwesomeIcon className='text-lg' icon={faAngleDown} />
      </button>

      {isOpen ? (
        <>
          <div className='h-0.5 w-full bg-white' />
          <div className='p-5'>
            <table>
              <tr>
                <th></th>
                <th>{num[0]}</th>
                <th>{num[1]}</th>
                <th>{num[2]}</th>
                <th>{num[3]}</th>
              </tr>
              <tr>
                <th>{num[0]}</th>
                <td>{matrix[num[0]][num[0]]}</td>
                <td>{matrix[num[0]][num[1]]}</td>
                <td>{matrix[num[0]][num[2]]}</td>
                <td>{matrix[num[0]][num[3]]}</td>
              </tr>
              <tr>
                <th>{num[1]}</th>
                <td>{matrix[num[1]][num[0]]}</td>
                <td>{matrix[num[1]][num[1]]}</td>
                <td>{matrix[num[1]][num[2]]}</td>
                <td>{matrix[num[1]][num[3]]}</td>
              </tr>
              <tr>
                <th>{num[2]}</th>
                <td>{matrix[num[2]][num[0]]}</td>
                <td>{matrix[num[2]][num[1]]}</td>
                <td>{matrix[num[2]][num[2]]}</td>
                <td>{matrix[num[2]][num[3]]}</td>
              </tr>
              <tr>
                <th>{num[3]}</th>
                <td>{matrix[num[3]][num[0]]}</td>
                <td>{matrix[num[3]][num[1]]}</td>
                <td>{matrix[num[3]][num[2]]}</td>
                <td>{matrix[num[3]][num[3]]}</td>
              </tr>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
