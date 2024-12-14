const FormRow = ({ children, label, error, required }) => {
  return (
    <div className="w-full flex flex-col space-y-1 mb-3">
      {label && (
        <label
          htmlFor={children.props?.id}
          className={`text-[#444] mb-1 font-medium`}
        >
          {label}
          {required && <span className="text-red-700">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-sm">{error}</span>}
    </div>
  );
};

export default FormRow;
