import { useEffect, useState } from "react";

import ReferralTree from "./components/ReferralTree";
import InvestmentTable from "./components/InvestmentTable";
import ROIHistory from "./components/ROIHistory";
import ReferralIncomeTable from "./components/ReferralIncomeTable";
import Charts from "./components/Charts";


function App() {

  const [data, setData] = useState({
    walletBalance: 0,
    totalROI: 0,
    totalLevelIncome: 0,
    totalInvestment: 0
  });

  const [loading, setLoading] = useState(true);


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

    .then((res) => {

      if (!res.ok) {
        throw new Error("Unauthorized or API Error");
      }

      return res.json();

    })

    .then((result) => {

      console.log("Dashboard Data:", result);

      setData(result);

      setLoading(false);

    })

    .catch((err) => {

      console.log("Error:", err);

      setLoading(false);

    });


  }, []);



  if (loading) {
    return <h2>Loading...</h2>;
  }



  return (

    <div style={{ padding:"20px", fontFamily:"Arial" }}>


      <h1>Dashboard</h1>



      {/* Dashboard Cards */}

      <div
        style={{
          display:"flex",
          gap:"20px",
          flexWrap:"wrap"
        }}
      >


        <div style={cardStyle}>
          <h3>Total Investment</h3>
          <p>₹ {data.totalInvestment || 0}</p>
        </div>



        <div style={cardStyle}>
          <h3>Daily ROI</h3>
          <p>₹ {data.totalROI || 0}</p>
        </div>



        <div style={cardStyle}>
          <h3>Total Level Income</h3>
          <p>₹ {data.totalLevelIncome || 0}</p>
        </div>



        <div style={cardStyle}>
          <h3>Wallet Balance</h3>
          <p>₹ {data.walletBalance || 0}</p>
        </div>


      </div>




      {/* Referral Tree */}

      <div style={{marginTop:"40px"}}>
        <ReferralTree />
      </div>




      {/* Investment History */}

      <div style={{marginTop:"40px"}}>
        <InvestmentTable />
      </div>




      {/* ROI History */}

      <div style={{marginTop:"40px"}}>
        <ROIHistory />
      </div>




      {/* Referral Income History */}

      <div style={{marginTop:"40px"}}>
        <ReferralIncomeTable />
      </div>




      {/* Charts */}

      <div style={{marginTop:"40px"}}>
        <Charts />
      </div>



    </div>

  );

}




const cardStyle = {

  border:"1px solid #ccc",

  borderRadius:"10px",

  padding:"20px",

  width:"200px",

  textAlign:"center",

  boxShadow:"0 2px 5px rgba(0,0,0,0.1)"

};



export default App;