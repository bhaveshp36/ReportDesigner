/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const App = ({ steamid }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.opendota.com/api/players/${steamid}/wl`
        );
        setPlayerData(response.data);
        console.log("playerData", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();
  }, [steamid]);
  console.log("playerData", playerData);

  return (
    <>
      <Card title="Win / Loss Stats" style={{ flex: 1 }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Row gutter={16} style={{ flex: 1 }}>
            <Col span={12}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Win"
                  value={playerData?.win || 0}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Statistic
                  title="Loss"
                  value={playerData?.lose || 0}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};
export default App;
