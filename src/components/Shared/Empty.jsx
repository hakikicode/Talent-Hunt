const Empty = ({ resourceName }) => {
  return (
    <p className="text-center font-medium text-gray-600">
      No {resourceName} could be found.
    </p>
  );
};

export default Empty;
