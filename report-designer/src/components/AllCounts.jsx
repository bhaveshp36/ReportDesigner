// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AllCounts = ({ steamid }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from API using axios
    axios
      .get(`https://api.opendota.com/api/players/${steamid}/counts`)
      .then((response) => {
        console.log("Data fetched:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [steamid]);

  const renderTable = (title, dataSource) => {
    const columns = [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Games",
        dataIndex: "games",
        key: "games",
        sorter: (a, b) => a.games - b.games,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Wins",
        dataIndex: "win",
        key: "win",
        sorter: (a, b) => a.win - b.win,
        sortDirections: ["descend", "ascend"],
      },
    ];

    return (
      <Card title={title} style={{ marginBottom: "16px" }}>
        {dataSource ? (
          <Table dataSource={dataSource} columns={columns} />
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    );
  };

  return (
    <Card title="All Counts" style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data ? (
          Object.entries(data).map(([key, value]) => (
            <div key={key} style={{ flex: "1 0 auto", margin: "5px" }}>
              {renderTable(
                key,
                Object.entries(value).map(([category, stats]) => ({
                  key: category,
                  category,
                  games: stats.games,
                  win: stats.win,
                }))
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Card>
  );
};

export default AllCounts;
