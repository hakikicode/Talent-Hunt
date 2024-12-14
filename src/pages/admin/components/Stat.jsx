const Stat = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="flex items-center space-x-4 bg-white rounded-md px-6 py-4 border border-gray-100">
      <div
        className={`h-14 w-14 rounded-full  flex items-center justify-center bg-${color}-100 text-${color}-500`}
      >
        {Icon}
      </div>
      <div>
        <div className="uppercase text-xs font-semibold text-gray-500">
          {title}
        </div>
        <div className="text-[26px] font-medium text-gray-700">{value}</div>
      </div>
    </div>
  );
};

export default Stat;
