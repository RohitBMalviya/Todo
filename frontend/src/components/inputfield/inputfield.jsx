export default function InputField({ className, name, type, id, ...props }) {
  return (
    <input
      autoComplete="on"
      className={`${className} rounded-xl h-12 w-full sm:text-xl text-base p-2 font-medium outline-none`}
      name={name}
      type={type}
      id={id}
      {...props}
      required
    />
  );
}
