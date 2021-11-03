export default function Input({ type = "text", refe = null, styles = "" }) {
  return (
    <input
      className={
        "border-none rounded-md text-black bg-white bg-opacity-40 focus:bg-opacity-60 focus:outline-none " +
        styles
      }
      type={type}
      ref={refe}
    />
  );
}
