import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import bannerImage from '../assets/banner.png';

const Banner = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();

  const onSearch = (data) => {
    navigate("/contests", { state: { search: data.search } });
    reset();
  };

  return (
    <section>
      <div className="relative py-12 bg-white sm:py-16 lg:py-20">
        <div className="absolute inset-0">
          <img
            className="object-cover object-right w-full h-full lg:object-center"
            src={bannerImage}
            alt="Talent Hunt Banner"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl xl:text-6xl">
              Show Your Talent <br /> Shine to the World
            </h1>
            <p className="max-w-lg mx-auto mt-6 text-lg font-medium leading-7 text-gray-200">
              Join Kwara's premier talent-harvesting platform! Register, showcase
              your skills, and let the audience decide your fate with their
              votes.
            </p>

            <form
  onSubmit={handleSubmit(onSearch)}
  className="max-w-xl mx-auto mt-10"
>
  <div>
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <div className="relative">
      <input
        type="text"
        id="search"
        {...register("search")}
        placeholder="Search for participants, contests..."
        className="block w-full py-3 pl-4 pr-4 text-base font-medium leading-7 text-gray-900 placeholder-gray-500 bg-white border rounded-md focus:ring-indigo-500 focus:border-indigo-500"

      />
    </div>
  </div>

  <button
  type="submit"
  className="
    mt-4
    inline-flex
    items-center
    justify-center
    w-full
    px-6
    py-3
    text-sm
    font-bold
    text-white
    uppercase
    transition-all
    duration-200
    bg-red-600
    rounded-md
    hover:bg-red-700
    focus:ring-2 focus:ring-offset-2 focus:ring-red-500
  "
>
  Search Contests
</button>
</form>

<div className="flex justify-center mt-8 gap-4">
  <button
    onClick={() => navigate("#")}
    className="
      inline-flex
      items-center
      px-6
      py-3
      text-sm
      font-bold
      text-white
      uppercase
      transition-all
      duration-200
      bg-green-600
      rounded-md
      hover:bg-green-700
      focus:ring-2 focus:ring-offset-2 focus:ring-green-500
    "
  >
                Registeration Closed
              </button>

              {/* <button
                onClick={() => navigate("/vote")}
                className="
                  inline-flex
                  items-center
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  uppercase
                  transition-all
                  duration-200
                  bg-blue-600
                  rounded-md
                  hover:bg-blue-700
                  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                "
              >
              Vote Now
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
