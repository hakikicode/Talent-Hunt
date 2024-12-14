const FormLayout = ({ children, ...rest }) => {
  return (
    <form {...rest} className="w-full max-w-4xl mx-auto p-8 bg-white space-y-4">
      {children}
    </form>
  );
};

export default FormLayout;
