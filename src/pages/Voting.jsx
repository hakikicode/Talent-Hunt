import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Voting = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data for testing
  useEffect(() => {
    const mockData = [
      { id: 1, name: "John Doe", talent: "Singing", votes: 50 },
      { id: 2, name: "Jane Smith", talent: "Dancing", votes: 75 },
      { id: 3, name: "Mike Johnson", talent: "Acting", votes: 30 },
    ];
    setParticipants(mockData);
    setLoading(false);
  }, []);

  const handleVote = (participantId) => {
    navigate("/payment", { state: { participantId } }); // Pass participantId to Payment
  };  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Vote for Your Favorite Talent
        </h2>
        {participants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="p-6 bg-white shadow-lg rounded-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {participant.name}
                </h3>
                <p className="mt-2 text-gray-600">{participant.talent}</p>
                <p className="mt-4 text-gray-800">
                  Votes: <span className="font-bold">{participant.votes}</span>
                </p>
                <button
                  onClick={() => handleVote(participant.id)}
                  className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-8 text-gray-500">
            No participants found. Please check back later.
          </p>
        )}
      </div>
    </section>
  );
};

export default Voting;
