import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const PAGE_SIZE = Number(import.meta.env.VITE_APP_PAGE_SIZE);

function Pagination({ count = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount === 1) return null;

  if (count === 0) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-sm text-gray-700 font-normal">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-2">
        <div>
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className={`${
              currentPage === 1
                ? "bg-gray-50 text-gray-500"
                : "bg-blue-600 text-white"
            } px-2 py-1 text-sm rounded-md font-medium flex items-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50  hover:bg-blue-600 disabled:hover:bg-gray-50
            disabled:hover:text-gray-500 hover:text-white`}
          >
            <HiChevronLeft className="h-6 w-6" />
            <span>Previous</span>
          </button>
        </div>
        <div>
          <button
            disabled={currentPage === pageCount}
            onClick={nextPage}
            className={`${
              currentPage === pageCount
                ? "bg-gray-50 text-gray-500"
                : "bg-blue-600 text-white"
            } px-2 py-1 rounded-md font-semibold flex items-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-50
            disabled:hover:text-gray-500  hover:bg-blue-600 hover:text-white`}
          >
            <span>Next</span>
            <HiChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
