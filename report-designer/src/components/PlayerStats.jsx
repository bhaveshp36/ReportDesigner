// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Descriptions, Row, Col } from "antd";

// eslint-disable-next-line react/prop-types
const PlayerStats = ({ steamid }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.opendota.com/api/players/${steamid}`
        );
        setPlayerData(response.data);
        console.log("Player data:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();
  }, [steamid]);

  const items = [
    {
      key: "account_id",
      label: "Account ID",
      children: playerData?.profile?.account_id || "N/A",
    },
    {
      key: "personaname",
      label: "Persona Name",
      children: playerData?.profile?.personaname || "N/A",
    },
    {
      key: "name",
      label: "Name",
      children: playerData?.profile?.name || "N/A",
    },
    {
      key: "plus",
      label: "Plus",
      children: playerData?.profile?.plus ? "Yes" : "No",
    },
    {
      key: "cheese",
      label: "Cheese",
      children: playerData?.profile?.cheese || 0,
    },
    {
      key: "steamid",
      label: "Steam ID",
      children: playerData?.profile?.steamid || "N/A",
    },
    {
      key: "profileurl",
      label: "Profile URL",
      children: playerData?.profile?.profileurl || "N/A",
    },
    {
      key: "last_login",
      label: "Last Login",
      children: playerData?.profile?.last_login || "N/A",
    },
    {
      key: "loccountrycode",
      label: "Country Code",
      children: playerData?.profile?.loccountrycode || "N/A",
    },
    {
      key: "status",
      label: "Status",
      children: playerData?.profile?.status || "N/A",
    },
    {
      key: "fh_unavailable",
      label: "FH Unavailable",
      children: playerData?.profile?.fh_unavailable ? "Yes" : "No",
    },
    {
      key: "is_contributor",
      label: "Is Contributor",
      children: playerData?.profile?.is_contributor ? "Yes" : "No",
    },
    {
      key: "is_subscriber",
      label: "Is Subscriber",
      children: playerData?.profile?.is_subscriber ? "Yes" : "No",
    },
    {
      key: "rank_tier",
      label: "Rank Tier",
      children: playerData?.rank_tier || "N/A",
    },
    {
      key: "leaderboard_rank",
      label: "Leaderboard Rank",
      children: playerData?.leaderboard_rank || "N/A",
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Card title="Player Stats" style={{ flex: 1, width: "100%" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row>
            <Col span={8}>
              <img src={playerData.profile.avatarfull} alt="Avatar" />
            </Col>
            <Col span={16}>
              <Descriptions title="User Info" items={items} />
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default PlayerStats;
