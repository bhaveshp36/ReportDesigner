/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const App = () => {
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
    <>
        <Card title="Win / Loss Stats" style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Row gutter={16} style={{ flex: 1 }}>
                    <Col span={12}>
                        <Card bordered={false} style={{ height: "100%" }}>
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{
                                    color: "#3f8600",
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} style={{ height: "100%" }}>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{
                                    color: "#cf1322",
                                }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
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
