const Button = ({ children, type, ...rest }) => {
  if (type === "icon")
    return (
      <button
        {...rest}
        className="p-2 rounded-sm transition-all duration-200 hover:bg-gray-100"
      >
        {children}
      </button>
    );

  return (
    <button
      {...rest}
      className="p-2 rounded-sm transition-all duration-200 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};

export default Button;
