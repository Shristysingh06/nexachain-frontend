import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [wallet, setWallet] = useState(null);

  // 🔥 FETCH INVESTMENTS
  const fetchInvestments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/investments/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setInvestments(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH REFERRAL
  const fetchReferral = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/referral/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setReferrals(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FETCH WALLET
  const fetchWallet = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wallet", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setWallet(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 INVEST
  const investMoney = async () => {
    try {
      await fetch("http://localhost:5000/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: 1000 }),
      });

      fetchInvestments();
      fetchReferral();
      fetchWallet();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 WITHDRAW
  const withdrawMoney = async () => {
    try {
      await fetch("http://localhost:5000/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: 500 }),
      });

      fetchWallet();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 PAGE LOAD
  useEffect(() => {
    fetchInvestments();
    fetchReferral();
    fetchWallet();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>

      {/* WALLET */}
      <h2>💳 Wallet Balance</h2>
      <p>₹ {wallet?.balance || 0}</p>

      {/* BUTTONS */}
      <button onClick={investMoney} style={{ marginRight: "10px" }}>
        Invest ₹1000
      </button>

      <button onClick={withdrawMoney}>
        Withdraw ₹500
      </button>

      {/* INVESTMENTS */}
      <h2>💰 Investment History</h2>
      {investments.length === 0 ? (
        <p>No Investment Found</p>
      ) : (
        investments.map((item) => (
          <div key={item._id}>
            ₹{item.amount}
          </div>
        ))
      )}

      {/* REFERRAL */}
      <h2>👥 Referral Income</h2>
      {referrals.length === 0 ? (
        <p>No Referral Income</p>
      ) : (
        referrals.map((item) => (
          <div key={item._id}>
            ₹{item.incomeAmount} (Level {item.level})
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;