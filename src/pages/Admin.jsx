import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import app from "../firebase/firebase.config";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const db = getDatabase(app);

  useEffect(() => {
    const paymentsRef = ref(db, "payments");
    onValue(paymentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setPayments(Object.entries(data).map(([id, details]) => ({ id, ...details })));
    });
  }, [db]);

  const handleApproval = async (id, status) => {
    const paymentRef = ref(db, `payments/${id}`);
    await update(paymentRef, { status });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Payments</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Votes</th>
            <th className="border px-4 py-2">Proof</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.userId}</td>
              <td className="border px-4 py-2">{payment.amount}</td>
              <td className="border px-4 py-2">{payment.votes}</td>
              <td className="border px-4 py-2">
                <a href={payment.proofUrl} target="_blank" rel="noopener noreferrer">
                  View Proof
                </a>
              </td>
              <td className="border px-4 py-2">{payment.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleApproval(payment.id, "Approved")}
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(payment.id, "Rejected")}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
