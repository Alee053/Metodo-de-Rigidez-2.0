import Button from "../../components/templates/Button";
import Input from "../../components/templates/Input";

export default function InputBarsVigas() {
  return (
    <div className='grid grid-rows-2 gap-2 bg-white bg-opacity-5 p-10 pb-6 rounded-2xl border-2 border-gray-300 '>
      <div>
        <h2 className='inline-block text-xl'>E:</h2>
        <Input type='number' styles='w-40 inline-block mx-5' />
        <h2 className='inline-block text-xl'>I:</h2>
        <Input type='number' styles='w-40 inline-block mx-5' />
        <h2 className='inline-block text-xl'>L:</h2>
        <Input type='number' styles='w-40 inline-block mx-5' />
      </div>
      <div className='grid grid-cols-2'>
        <div>
          <h2 className='inline-block text-xl'>Numeracion:</h2>
          <Input type='number' styles='w-10 inline-block ml-2' />
          <Input type='number' styles='w-10 inline-block ml-2' />
          <Input type='number' styles='w-10 inline-block ml-2' />
          <Input type='number' styles='w-10 inline-block ml-2' />
        </div>
        <Button styles='w-min justify-self-center border-2'>Añadir</Button>
      </div>
    </div>
  );
}
