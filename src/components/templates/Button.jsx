export default function Btn({
  func = () => {
    console.log("Button Clicked!");
  },
  children,
  styles = "",
  isDisabled = false,
}) {
  return (
    <button
      className={
        "text-white rounded-xl xl:p-2 xl:text-lg sm:text-sm hover:bg-gray-200 hover:bg-opacity-10 hover:text-white hover:shadow-md mx-5 disabled:opacity-50" +
        " " +
        styles
      }
      onClick={func}
      disabled={isDisabled}>
      {children}
    </button>
  );
}
