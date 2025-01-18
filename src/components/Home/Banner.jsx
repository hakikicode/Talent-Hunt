import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../../firebase/firebase.config";
import bannerImage from '../assets/banner.png';

const Banner = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(true); // Popup visibility state

  const db = getDatabase(app); // Initialize Firebase Database

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Fetch participants from Firebase
    const participantsRef = ref(db, "participants");
    onValue(participantsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = Object.values(data).filter(
          (participant) =>
            participant.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            participant.talent
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        setResults(formattedData);

        if (formattedData.length === 0) {
          alert("No results found.");
        }
      } else {
        setResults([]);
        alert("No data available.");
      }
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleResultClick = (participantId) => {
    navigate(`/vote?participantId=${participantId}`);
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
              THE NEXT CHAPTER BEGINS!

              To our talented contestants, congratulations on completing the audition stage!

              We are thrilled to announce that E-VOTING LIVE SOON!

              Cast your votes, share with your network, and let the talent shine!

              Click on the button below to vote now and take the first step towards raising a participant to stardom!
            </p>

            <form
              onSubmit={handleSearch}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Search Results */}
            {results.length > 0 && (
              <div className="mt-6 bg-white shadow-lg rounded-md p-4">
                <h3 className="text-lg font-bold text-gray-800">Search Results:</h3>
                <ul className="mt-4 space-y-4">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleResultClick(result.id)}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                      <p className="text-gray-800 font-medium">{result.name}</p>
                      <p className="text-gray-600 text-sm">
                        Talent: {result.talent}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

<div className="flex justify-center mt-8 gap-4">
  {/* <button
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
              </button> */}

              <button
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
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="w-96 p-6 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg shadow-2xl ring-4 ring-yellow-400 animate-scale-in relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-white text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 focus:outline-none"
        >
          ✖
        </button>
        <h2 className="text-xl font-extrabold text-center animate-pulse">
          🚨 IMPORTANT UPDATE! 🚨
        </h2>
        <p className="mt-4 text-lg font-semibold text-yellow-200 text-center">
          Registration for Kwara Talent Harvest 5.0 is NOW OFFICIALLY CLOSED!
        </p>
        <ul className="mt-4 space-y-3 text-white font-medium">
          <li>✨ <b>Thank you</b> to all the amazing talents who applied!</li>
          <li>🔥 <b>Get ready</b> for an unforgettable talent showcase!</li>
          <li>🎉 <b>Next stage:</b> It's time to move forward!</li>
          <li>🗳️ <b>E-VOTING</b> IS LIVE!</li>
        </ul>
        <p className="mt-4 text-center text-yellow-300 font-semibold text-lg">
          Cast your votes and support your favorite contestants!
        </p>
        <p className="mt-2 text-center text-white">
        Vote for Your Favorite – Talent!
          <button
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
              </button>
        </p>
        </div>
      </div>         
      )}
    </section>
  );
};

export default Banner;
