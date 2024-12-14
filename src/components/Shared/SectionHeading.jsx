const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <p className="text-lg font-medium text-gray-600 font-pj">{subtitle}</p>
      <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl xl:text-4xl font-pj">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
