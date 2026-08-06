import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState({
    walletBalance: 0,
    totalROI: 0,
    totalLevelIncome: 0
  });


  useEffect(() => {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);


    fetch("http://localhost:5000/api/users/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })

      .then((res) => res.json())

      .then((result) => {
        console.log("Dashboard Data:", result);
        setData(result);
      })

      .catch((err) => {
        console.log("Error:", err);
      });


  }, []);



  return (
    <div>

      <h1>Dashboard</h1>

      <p>
        Wallet: ₹ {data.walletBalance}
      </p>

      <p>
        Total ROI: ₹ {data.totalROI}
      </p>

      <p>
        Level Income: ₹ {data.totalLevelIncome}
      </p>


    </div>
  );
}


export default App;