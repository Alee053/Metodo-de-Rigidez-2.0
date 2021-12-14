export default function Input({
                                type = "text",
                                refe = null,
                                styles = "",
                                placeholder = "",
                              }) {
  return (
    <input
      className={
        "border-none rounded-md text-black bg-white bg-opacity-40 focus:bg-opacity-60 focus:outline-none placeholder-gray-600 h-7" +
        " " +
        styles
      }
      type={type}
      ref={refe}
      placeholder={placeholder}
    />
  );
}
