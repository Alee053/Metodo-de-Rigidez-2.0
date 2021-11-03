export default function SingleBarVigas({ E = 0, I = 0, L = 0 }) {
  return (
    <div>
      <div className='bg-white justify-items-center bg-opacity-20 grid grid-cols-3 p-5 rounded-lg pb-10'>
        <h2 className='w-60 text-center text-xl font-bold'>E: {E}</h2>
        <h2 className='w-60 text-center text-xl font-bold'>I: {I}</h2>
        <h2 className='w-60 text-center text-xl font-bold'>L: {L}</h2>
      </div>
    </div>
  );
}
