import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../firebase/firebase.config";

const Payment = () => {
  const [proof, setProof] = useState(null);
  const [votes, setVotes] = useState(1);

  const handlePaymentSubmission = async (e) => {
    e.preventDefault();

    if (!proof) {
      alert("Please upload proof of payment.");
      return;
    }

    try {
      const storage = getStorage();
      const fileRef = storageRef(storage, `paymentProofs/${proof.name}`);
      await uploadBytes(fileRef, proof);
      const proofUrl = await getDownloadURL(fileRef);

      const paymentData = {
        amount: votes * 300,
        votes,
        proofUrl,
        status: "Pending",
      };

      const paymentsRef = ref(database, "payments");
      await push(paymentsRef, paymentData);

      alert("Payment proof submitted successfully!");
    } catch (error) {
      console.error("Error during payment submission:", error);
      alert("Failed to submit payment proof. Try again.");
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <form onSubmit={handlePaymentSubmission}>
        <label>Number of Votes:</label>
        <input
          type="number"
          value={votes}
          onChange={(e) => setVotes(Math.min(200, Math.max(1, +e.target.value)))}
          max="200"
          min="1"
          required
        />
        <p>Total: {votes * 300} Naira</p>
        <label>Proof of Payment:</label>
        <input type="file" onChange={(e) => setProof(e.target.files[0])} required />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
