// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const RecentMatches = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API using axios
    axios
      .get("your_api_endpoint")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      title: "Match ID",
      dataIndex: "match_id",
      key: "match_id",
    },
    {
      title: "Player Slot",
      dataIndex: "player_slot",
      key: "player_slot",
    },
    {
      title: "Radiant Win",
      dataIndex: "radiant_win",
      key: "radiant_win",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Game Mode",
      dataIndex: "game_mode",
      key: "game_mode",
    },
    {
      title: "Lobby Type",
      dataIndex: "lobby_type",
      key: "lobby_type",
    },
    {
      title: "Hero ID",
      dataIndex: "hero_id",
      key: "hero_id",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
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
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
    },
    {
      title: "Average Rank",
      dataIndex: "average_rank",
      key: "average_rank",
    },
    {
      title: "Leaver Status",
      dataIndex: "leaver_status",
      key: "leaver_status",
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default RecentMatches;
