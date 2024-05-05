// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin } from "antd";
const { Meta } = Card;

const PlayerStats = () => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const steamid = "252253616";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.opendota.com/api/players/${steamid}`
        );
        setPlayerData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Card title="Player Stats">
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  src={playerData?.profile?.avatarfull}
                  alt="Player Avatar"
                />
              }
            >
              <Meta
                title={playerData?.profile?.personaname}
                description={playerData?.profile?.steamid}
              />
              <p>Player Name: {playerData?.profile?.personaname}</p>
              <p>MMR: {playerData?.rank_tier}</p>
              <p>Account ID: {playerData?.profile?.account_id}</p>
              <p>Steam ID: {playerData?.profile?.steamid}</p>
              <p>Country: {playerData?.profile?.loccountrycode}</p>
              <p>Last Login: {playerData?.profile?.last_login}</p>
              <p>
                Profile URL:{" "}
                <a href={playerData?.profile?.profileurl}>
                  {playerData?.profile?.profileurl}
                </a>
              </p>
            </Card>
          </>
        )}
      </Card>
    </div>
  );
};

export default PlayerStats;
