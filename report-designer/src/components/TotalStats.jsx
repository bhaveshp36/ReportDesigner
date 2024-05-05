// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Statistic } from "antd";
import axios from "axios";

const TotalStats = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get("https://api.opendota.com/api/players/302276496/totals")
      .then((response) => {
        setStatsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {statsData.map((stat) => (
        <div
          style={{
            flex: "1 0 20%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            margin: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
          }}
          key={stat.field}
        >
          <Statistic title={stat.field} value={stat.sum} />
        </div>
      ))}
    </div>
  );
};

export default TotalStats;
