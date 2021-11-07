import InputBarsVigas from "../components/InputBarsVigas";
import SingleBarVigas from "../components/SingleBarVigas";

export default function SeccionBarras() {
  return (
    <div className='w-full grid grid-rows-min-2 place-items-center p-10 gap-10 overflow-y-scroll'>
      <InputBarsVigas />
      <SingleBarVigas />
    </div>
  );
}
