import Button from "./templates/Button";
import Input from "./templates/Input";

export default function Footerbar() {
  return (
    <nav className='w-screen bg-gradient-to-l from-indigo-700 to-blue-500 grid grid-cols-2 items-center h-15 border-t-2'>
      <div className='inline-block'>
        <h2 className='text-lg inline-block mx-5'>Precision:</h2>
        <Input type='number' styles='w-20' />
        <Button>Aplicar</Button>
      </div>

      <div className='justify-self-end'>
        <Button>Guardar Barras</Button>
        <Button>Cargar Barras</Button>
        <Button>Borrar Todo</Button>
      </div>
    </nav>
  );
}
