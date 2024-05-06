/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spin } from "antd";

import { useNavigate } from "react-router-dom";

function App() {
  const [player, setPlayer] = useState(null);

  const navigate = useNavigate();

  const onPlayerClick = (steamid) => () => {
    console.log("Clicked on player", steamid);
    navigate(`/report/${steamid}`);
  };

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/players`); // Replace with your API endpoint
        console.log(response.data);
        setPlayer(response.data);
      } catch (error) {
        console.error("Failed to fetch player:", error);
      }
    };

    getPlayer();
  }, []);

  return (
    <>
      {player ? (
        player.map((playerData, index) => (
          <div key={index}>
            <Card
              hoverable
              style={{ margin: "20px" }}
              cover={<img alt="avatar" src={playerData.avatar} />}
              onClick={onPlayerClick(playerData.steamid)}
            >
              <Card.Meta
                title={playerData.username}
                description={playerData.steamid}
              />
            </Card>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
    </>
  );
}

export default App;
