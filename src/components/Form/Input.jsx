const Input = ({
  type,
  value,
  defaultValue,
  disabled,
  onChange,
  id,
  ...rest
}) => {
  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      id={id}
      {...rest}
      className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
    />
  );
};

export default Input;
