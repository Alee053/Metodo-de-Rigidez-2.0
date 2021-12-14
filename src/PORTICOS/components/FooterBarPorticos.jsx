import {useContext, useRef} from "react";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import {VigasContext} from "../PorticosMain";

const {dialog} = window.require("@electron/remote");
const fs = window.require("fs");
const win = window.require("@electron/remote").getCurrentWindow();

export default function Footerbar() {
  const {MainSave, setMainData, setPrecision, precision, tempEquations, setSolvedData, solvedEquations, dArray} =
    useContext(VigasContext);

  const inputPres = useRef(null);

  function loadData() {
    let path = dialog.showOpenDialogSync(win, {
      title: "Cargar barras",
      filters: [{name: "FRAME", extensions: ["frame"]}],
    });

    if (path !== undefined) path = path.toString();
    else return;

    let save = fs
      .readFileSync(path, {encoding: "utf-8", flag: "r"})
      .toString();

    if (save === undefined || save === "") return;

    save = JSON.parse(save);
    setMainData(save);
  }

  function saveData() {
    const save = JSON.stringify(MainSave.current);
    let path = dialog.showSaveDialogSync(win, {
      title: "Guardar barras",
      filters: [{name: "FRAME", extensions: ["frame"]}],
    });
    if (path !== undefined) fs.writeFileSync(path, save);
  }

  function clearAll(skip = false) {
    let response = 0;
    if (!skip) {
      const options = {
        title: "Metodo de Rigidez",
        buttons: ["Cancelar", "Confirmar"],
        message: "¿Seguro que quieres borrar todas las barras?",
      };
      response = dialog.showMessageBoxSync(win, options);
    }
    if (response === 1) {
      setMainData({bars: [], vectores: [[], []]});
      tempEquations.current = [[], []];
      setSolvedData({
        bars: [],
        totalMatrix: [],
      })
      solvedEquations.current = [];
      dArray.current = [];
    }
  }

  function changePrecision() {
    setPrecision(inputPres.current.value ? inputPres.current.value : precision);
    inputPres.current.value = "";
  }

  return (
    <nav
      className='w-screen bg-gradient-to-l from-indigo-700 to-blue-500 grid grid-cols-2 items-center h-15 border-t-2'>
      <div className='grid grid-cols-min-3-3 items-center'>
        <h2 className='text-lg inline-block mx-5'>Precision:</h2>
        <Input styles='w-20' placeholder={precision} refe={inputPres}/>
        <Button func={changePrecision}>Aplicar</Button>
      </div>

      <div className='justify-self-end'>
        <Button func={saveData}>Guardar Barras</Button>
        <Button func={loadData}>Cargar Barras</Button>
        <Button func={() => {
          clearAll()
        }}>Borrar Todo</Button>
      </div>
    </nav>
  );
}
