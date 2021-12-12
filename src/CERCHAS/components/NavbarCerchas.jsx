import {Link} from "react-router-dom";

import Tab from "../../components/templates/Tab";

export default function NavbarCerchas() {
  return (
    <nav className='w-screen bg-gradient-to-l from-indigo-700 to-blue-500 border-b-2 grid grid-cols-min-2 items-center'>
      {/* "LOGO" */}
      <Link to='/home'>
        <div className='w-max border-4 rounded-xl xl:mx-10 xl:my-5 sm:mx-5 sm:my-2 border-white '>
          <h1 className='xl:text-3xl px-3 pt-2 text-white uppercase'>
            Metodo de la Rigidez
          </h1>
          <h3 className='xl:text-lg pl-3 pb-1 text-white sm:text-sm uppercase'>
            Cerchas
          </h3>
        </div>
      </Link>
      <ul>
        <Tab to='/cerchas/barras'>Barras</Tab>
        <Tab to='/cerchas/matriz-total'>Matriz Total</Tab>
        <Tab to='/cerchas/vectores'>Vectores</Tab>
        <Tab to='/cerchas/reacciones'>Reacciones y Desplazamientos</Tab>
        <Tab to={"/cerchas/fuerzas"}>Fuerzas Internas</Tab>
      </ul>
    </nav>
  );
}
