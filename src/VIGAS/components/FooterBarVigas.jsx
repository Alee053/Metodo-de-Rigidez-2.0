import { useContext } from "react";

import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

import { VigasContext } from "../VigasMain";

const { dialog } = window.require("@electron/remote");
const fs = window.require("fs");
const win = window.require("@electron/remote").getCurrentWindow();

export default function Footerbar() {
  const { MainData, setMainData } = useContext(VigasContext);

  function loadData() {
    let path = dialog.showOpenDialogSync(win, {
      title: "Cargar barras",
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    if (path !== undefined) path = path.toString();
    else return;

    let save = fs
      .readFileSync(path, { encoding: "utf-8", flag: "r" })
      .toString();

    if (save === undefined || save === "") return;

    save = JSON.parse(save);
    setMainData(save);
  }

  function saveData() {
    const save = JSON.stringify(MainData);
    let path = dialog.showSaveDialogSync(win, {
      title: "Guardar barras",
      filters: [{ name: "JSON", extensions: ["json"] }],
    });
    if (path !== undefined) fs.writeFileSync(path, save);
  }

  function clearAll() {
    const options = {
      title: "Metodo de Rigidez",
      buttons: ["Confirmar", "Cancelar"],
      message: "¿Seguro que quieres borrar todas las barras?",
    };
    const response = dialog.showMessageBoxSync(win, options);
    if (response === 0) setMainData({ bars: [], vectores: [[], []] });
  }

  return (
    <nav className='w-screen bg-gradient-to-l from-indigo-700 to-blue-500 grid grid-cols-2 items-center h-15 border-t-2'>
      <div className='inline-block'>
        <h2 className='text-lg inline-block mx-5'>Precision:</h2>
        <Input type='number' styles='w-20' />
        <Button>Aplicar</Button>
      </div>

      <div className='justify-self-end'>
        <Button func={saveData}>Guardar Barras</Button>
        <Button func={loadData}>Cargar Barras</Button>
        <Button func={clearAll}>Borrar Todo</Button>
      </div>
    </nav>
  );
}
