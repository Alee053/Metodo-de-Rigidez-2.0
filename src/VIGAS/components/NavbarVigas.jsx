import Tab from "../../components/templates/Tab";
import Button from "../../components/templates/Button";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const {dialog, BrowserWindow} = window.require("@electron/remote")

export default function NavbarVigas() {
  const history = useHistory();

  function goHome() {
    const window = BrowserWindow.getFocusedWindow();

    const options = {
      title: "Metodo de Rigidez",
      buttons: ["Confirmar", "Cancelar"],
      message: "¿Seguro que quieres volver al menu principal? (Se borraran los datos no guardados)",
    };
    const response = dialog.showMessageBoxSync(window, options);
    if (response === 0) history.push("/home");
  }

  return (
    <nav className='w-screen bg-gradient-to-l from-indigo-700 to-blue-500 border-b-2 grid grid-cols-min-3 items-center'>
      {/* "LOGO" */}
      <Button styles={"w-full"} func={goHome}><FontAwesomeIcon icon={faAngleLeft}/></Button>
      <div className='w-max border-4 rounded-xl xl:mx-10 xl:my-5 sm:mx-5 sm:my-2 border-white '>
        <h1 className='xl:text-3xl px-3 pt-2 text-white uppercase'>
          Metodo de la Rigidez
        </h1>
        <h3 className='xl:text-lg pl-3 pb-1 text-white sm:text-sm uppercase'>
          Vigas
        </h3>
      </div>
      <ul>
        <Tab to='/vigas/barras'>Barras</Tab>
        <Tab to='/vigas/matriz-total'>Matriz Total</Tab>
        <Tab to='/vigas/vectores'>Vectores</Tab>
        <Tab to='/vigas/ecuaciones'>Reacciones y Desplazamientos</Tab>
      </ul>
    </nav>
  );
}
