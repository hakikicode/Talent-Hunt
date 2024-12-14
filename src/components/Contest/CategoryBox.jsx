import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";

const CategoryBox = ({ label, icon: Icon }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isActive = searchParams?.get("category") === label.toLowerCase();

  const handleCategoryClick = () => {
    let currentQuery = {};

    if (searchParams.size > 0) currentQuery = qs.parse(searchParams.toString());

    const updatedQuery = {
      ...currentQuery,
      category: label.toLowerCase(),
    };

    if (searchParams?.get("category") === label.toLowerCase())
      delete updatedQuery.category;

    const url = qs.stringifyUrl(
      {
        url: "/contests",
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    navigate(url);
  };

  return (
    <div
      onClick={handleCategoryClick}
      style={{ borderColor: isActive && "#000" }}
      className={`flex flex-col space-y-1 items-center justify-center text-neutral-500  cursor-pointer border-b-2 pb-1 hover:text-neutral-700 hover:border-neutral-700 transition ${
        isActive && "text-neutral-900 border-neutral-900"
      }}`}
    >
      <Icon size={24} />
      <span>{label}</span>
    </div>
  );
};

export default CategoryBox;
