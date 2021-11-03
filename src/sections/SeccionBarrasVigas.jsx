import InputBarsVigas from "../components/main/InputBarsVigas";
import SingleBarVigas from "../components/main/SingleBarVigas";

export default function SeccionBarras() {
  return (
    <div className='w-full grid grid-rows-min-2 place-items-center overflow-y-auto p-10'>
      <InputBarsVigas />
      <SingleBarVigas />
    </div>
  );
}
