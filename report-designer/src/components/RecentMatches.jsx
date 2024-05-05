// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import axios from "axios";

const RecentMatches = () => {
  const steamid = "322669462";
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API using axios
    axios
      .get(`https://api.opendota.com/api/players/${steamid}/recentMatches`)
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
      sorter: (a, b) => a.match_id - b.match_id,
    },
    {
      title: "Player Slot",
      dataIndex: "player_slot",
      key: "player_slot",
      sorter: (a, b) => a.player_slot - b.player_slot,
    },
    {
      title: "Radiant Win",
      dataIndex: "radiant_win",
      key: "radiant_win",
      sorter: (a, b) => a.radiant_win.localeCompare(b.radiant_win),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Game Mode",
      dataIndex: "game_mode",
      key: "game_mode",
      sorter: (a, b) => a.game_mode.localeCompare(b.game_mode),
    },
    {
      title: "Lobby Type",
      dataIndex: "lobby_type",
      key: "lobby_type",
      sorter: (a, b) => a.lobby_type.localeCompare(b.lobby_type),
    },
    {
      title: "Hero ID",
      dataIndex: "hero_id",
      key: "hero_id",
      sorter: (a, b) => a.hero_id - b.hero_id,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      sorter: (a, b) => a.start_time - b.start_time,
      render: (timestamp) => {
        if (timestamp) {
          const date = new Date(timestamp * 1000); // Convert the Unix timestamp to milliseconds
          return date.toUTCString();
        }
        return "";
      },
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      sorter: (a, b) => a.version.localeCompare(b.version),
    },
    {
      title: "Kills",
      dataIndex: "kills",
      key: "kills",
      sorter: (a, b) => a.kills - b.kills,
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      key: "deaths",
      sorter: (a, b) => a.deaths - b.deaths,
    },
    {
      title: "Assists",
      dataIndex: "assists",
      key: "assists",
      sorter: (a, b) => a.assists - b.assists,
    },
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      sorter: (a, b) => a.skill.localeCompare(b.skill),
    },
    {
      title: "Average Rank",
      dataIndex: "average_rank",
      key: "average_rank",
      sorter: (a, b) => a.average_rank - b.average_rank,
    },
    {
      title: "Leaver Status",
      dataIndex: "leaver_status",
      key: "leaver_status",
      sorter: (a, b) => a.leaver_status.localeCompare(b.leaver_status),
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
      sorter: (a, b) => a.party_size - b.party_size,
    },
  ];

  return (
    <>
      <Card
        title="Recent Matches"
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          margin: "20px",
          padding: "20px",
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
    </>
  );
};

export default RecentMatches;
