import React from "react";
import Button from "./components/templates/Button.jsx"

export default function MainMenu() {

  return <div className={"grid grid-rows-min-2 w-screen place-items-center p-20 h-screen"}>
    <h1 className={"text-7xl border-4 p-2 rounded-2xl uppercase px-5"}>Metodo de la Rigidez</h1>
    <div className={"grid grid-cols-3 w-4/5 h-72"}>
      <Button styles={"border-2 uppercase"}>Cerchas</Button>
      <Button styles={"border-2 uppercase"}>Vigas</Button>
      <Button styles={"border-2 uppercase"}>Porticos</Button>
    </div>

  </div>;

}