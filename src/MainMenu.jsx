import React from "react";
import Button from "./components/templates/Button.jsx"
import {useHistory} from "react-router-dom";

export default function MainMenu() {
  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(path);
  }

  return <div className={"grid grid-rows-min-2 w-screen place-items-center p-20 h-screen"}>
    <h1 className={"text-7xl border-4 p-2 rounded-2xl uppercase px-5"}>Metodo de la Rigidez</h1>
    <div className={"grid grid-cols-3 w-4/5 h-72"}>
      <Button styles={"border-2 uppercase"} func={() => {
        handleRedirect("/cerchas/barras")
      }}>Cerchas</Button>
      <Button styles={"border-2 uppercase"} func={() => {
        handleRedirect("/vigas/barras")
      }}>Vigas</Button>
      <Button styles={"border-2 uppercase"} func={() => {
        handleRedirect("/porticos/barras")
      }}>Porticos</Button>
    </div>

  </div>;

}