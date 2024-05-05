// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "antd";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [heroes, setHeroes] = useState({});
  const [updatedRecords, setUpdatedRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "https://api.opendota.com/api/players/252253616/matches?sort=kills&limit=20"
        );
        setRecords(response.data);
        console.log("Records:", response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "https://api.opendota.com/api/constants/heroes"
        );
        setHeroes(response.data);
        console.log("Heroes:", response.data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    fetchRecords();
    fetchHeroes();
  }, []);

  useEffect(() => {
    if (Object.keys(records).length > 0 && Object.keys(heroes).length > 0) {
      const updated = records.map((record) => {
        const hero = heroes[record.hero_id];
        return {
          ...record,
          hero_id: hero ? hero.localized_name : record.hero_id,
        };
      });
      setUpdatedRecords(updated);
    }
  }, [records, heroes]);

  const columns = [
    {
      title: "Match ID",
      dataIndex: "match_id",
      key: "match_id",
    },
    {
      title: "Hero",
      dataIndex: "hero_id",
      key: "hero_id",
    },
    {
      title: "Result",
      dataIndex: "radiant_win",
      key: "radiant_win",
      render: (value) => (value ? "Won" : "Loss"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Kills",
      dataIndex: "kills",
      key: "kills",
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      key: "deaths",
    },
    {
      title: "Assists",
      dataIndex: "assists",
      key: "assists",
    },
  ];

  return (
    <>
      <Card
        title="Records"
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Table
          dataSource={updatedRecords}
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
    </>
  );
};

export default Records;
