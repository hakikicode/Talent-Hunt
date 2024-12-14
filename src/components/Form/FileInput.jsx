const FileInput = ({ id, disabled, accept, onChange, rest }) => {
  return (
    <label className="flex items-center font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer">
      <input
        id={id}
        type="file"
        disabled={disabled}
        accept={accept}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};

export default FileInput;
