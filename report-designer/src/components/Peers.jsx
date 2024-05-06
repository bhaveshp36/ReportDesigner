// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Peers = ({ steamid }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API using axios
    axios
      .get(`https://api.opendota.com/api/players/${steamid}/peers`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [steamid]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <img
          src={record.avatar}
          alt="avatar"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Account ID",
      dataIndex: "account_id",
      key: "account_id",
    },
    {
      title: "Personaname",
      dataIndex: "personaname",
      key: "personaname",
    },
    {
      title: "Last Played",
      dataIndex: "last_played",
      key: "last_played",
      sorter: (a, b) => a.last_played - b.last_played,
      render: (timestamp) => {
        if (timestamp) {
          const date = new Date(timestamp * 1000); // Convert the Unix timestamp to milliseconds
          return date.toUTCString();
        }
        return "";
      },
    },
    {
      title: "Win",
      dataIndex: "win",
      key: "win",
      sorter: (a, b) => a.win - b.win,
    },
    {
      title: "Games",
      dataIndex: "games",
      key: "games",
      sorter: (a, b) => a.games - b.games,
    },
    {
      title: "With Win",
      dataIndex: "with_win",
      key: "with_win",
      sorter: (a, b) => a.with_win - b.with_win,
    },
    {
      title: "With Games",
      dataIndex: "with_games",
      key: "with_games",
      sorter: (a, b) => a.with_games - b.with_games,
    },
    {
      title: "With GPM Sum",
      dataIndex: "with_gpm_sum",
      key: "with_gpm_sum",
      sorter: (a, b) => a.with_gpm_sum - b.with_gpm_sum,
    },
    {
      title: "With XPM Sum",
      dataIndex: "with_xpm_sum",
      key: "with_xpm_sum",
      sorter: (a, b) => a.with_xpm_sum - b.with_xpm_sum,
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      sorter: (a, b) => a.last_login - b.last_login,
      render: (timestamp) => {
        if (timestamp) {
          const date = new Date(timestamp); // Convert the Unix timestamp to milliseconds
          return date.toUTCString();
        }
        return "";
      },
    },
  ];

  return (
    <Card
      title="Peers"
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        size="large"
        pagination={false}
        style={{
          width: "100%",
          height: 400,
          margin: "20px",
        }}
      />
    </Card>
  );
};

export default Peers;
