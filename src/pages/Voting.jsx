import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getDatabase,
  ref,
  push,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import app from "../firebase/firebase.config";

const Voting = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [proof, setProof] = useState(null);
  const [votes, setVotes] = useState(1);
  const [countdown, setCountdown] = useState(300); // 5-minute countdown
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const db = getDatabase(app);

  // Fetch participants from Firebase
  useEffect(() => {
    const participantsRef = ref(db, "participants");
    onValue(participantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([id, details]) => ({
          id,
          ...details,
        }));
        setParticipants(formattedData);
      }
    });
  }, [db]);

  // Countdown Timer Logic
  useEffect(() => {
    if (showPopup && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (countdown <= 0 && isAwaitingApproval) {
      toast.error(
        "Payment not approved within the time limit. Please contact admin."
      );
      setShowPopup(false); // Close popup
      setIsAwaitingApproval(false); // Stop approval checks
    }
  }, [showPopup, countdown, isAwaitingApproval]);

  // Check for admin approval
  useEffect(() => {
    if (isAwaitingApproval) {
      const paymentsRef = query(
        ref(db, "payments"),
        orderByChild("participantId"),
        equalTo(selectedParticipant.id)
      );

      const approvalListener = onValue(paymentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const approvedPayment = Object.values(data).find(
            (payment) => payment.status === "Approved"
          );

          if (approvedPayment) {
            toast.success("Payment approved! Your vote has been counted.");
            setShowPopup(false); // Close the popup
            setIsAwaitingApproval(false); // Stop approval checks
          }
        }
      });

      return () => approvalListener(); // Cleanup listener on unmount
    }
  }, [isAwaitingApproval, db, selectedParticipant]);

  const handleVote = (participant) => {
    const votesLeft = parseInt(localStorage.getItem("votesLeft") || 200, 10);

    if (votesLeft <= 0) {
      toast.error("You have reached the maximum of 200 votes.");
      return;
    }

    setSelectedParticipant(participant);
    setShowPopup(true);
    setCountdown(300); // Reset countdown
  };

  const handleProofUpload = async (e) => {
    e.preventDefault();

    if (!proof) {
      toast.error("Please upload your payment proof.");
      return;
    }

    try {
      // Save payment data to Firebase
      const paymentData = {
        participantId: selectedParticipant.id,
        participantName: selectedParticipant.name,
        votes,
        amount: votes * 300,
        proofFileName: proof.name,
        status: "Pending",
        timestamp: new Date().toISOString(),
      };

      const paymentRef = ref(db, "payments");
      await push(paymentRef, paymentData);

      toast.success("Payment proof submitted! Waiting for admin approval.");
      setIsAwaitingApproval(true); // Start checking for admin approval
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Failed to submit payment. Please try again.");
    }
  };

  const handleShare = (participant) => {
    const shareUrl = `${window.location.origin}/vote?participantId=${participant.id}`;
    const shareText = `Support ${participant.name}'s talent by voting now on Kwara Talents Harvest! ${shareUrl}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Kwara Talents Harvest",
          text: shareText,
          url: shareUrl,
        })
        .then(() => toast.success("Link shared successfully!"))
        .catch(() => toast.error("Failed to share the link."));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy the link."));
    }
  };

  return (
    <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Vote for Your Favorite Talent
        </h2>
        <p className="max-w-full mt-4 text-lg font-bold text-yellow-400 bg-red-600 p-2 rounded-lg animate-pulse text-center">
        Kwara Talents Harvest 5.0 Voting ENDS by 11:59PM Tonight - SHOW YOUR LOVE & SUPPORT! ❤️ Vote now for just ₦300 per vote! 🚀🔥
        </p>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="p-6 bg-white shadow-lg rounded-lg text-center"
            >
              <img
                src={participant.profilePic}
                alt={participant.name}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h3 className="text-lg font-bold text-gray-800 mt-4">
                {participant.name}
              </h3>
              <p className="mt-2 text-gray-600">{participant.talent}</p>
              <div className="mt-4">
                <label className="block text-gray-600">Votes:</label>
                <progress
                  value={participant.votes}
                  max="1200"
                  className="w-full h-3 bg-gray-200 rounded-full"
                />
                <span>{participant.votes} Votes</span>
              </div>
              <div className="mt-4 flex gap-2 justify-center">
                <button
                  onClick={() => handleVote(participant)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Vote Now
                </button>
                <button
                  onClick={() => handleShare(participant)}
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-center">
              Bank Transfer Payment
            </h2>
            <p className="mt-4">
              <b>Account Name:</b> Kwara Talents Harvest <br />
              <b>Account Number:</b> 4820114717 <br />
              <b>Bank:</b> Eco Bank <br />
              <b>Comment/Narration:</b> comment name of the contestant you're voting for
            </p>
            <p className="mt-2">
              <b>Countdown:</b> {Math.floor(countdown / 60)}:
              {String(countdown % 60).padStart(2, "0")}
            </p>
            <form onSubmit={handleProofUpload} className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Votes:
              </label>
              <input
                type="number"
                value={votes}
                onChange={(e) =>
                  setVotes(Math.min(200, Math.max(1, +e.target.value)))
                }
                max="200"
                min="1"
                className="block w-full border rounded-md p-2"
                required
              />
              <p className="text-gray-600 mt-2">
                Total: <b>{votes * 300} Naira</b>
              </p>

              <label className="block text-gray-700 font-semibold mt-4">
                Upload Proof of Payment:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProof(e.target.files[0])}
                className="block w-full border rounded-md p-2 mt-2"
                required
              />

              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                I Have Paid
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Voting;
