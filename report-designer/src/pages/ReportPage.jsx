/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Layout, theme, Row, Col, Card, Form, Input, Button } from "antd";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

import AllCounts from "../components/AllCounts";
import Histograms from "../components/Histograms";
import Peers from "../components/Peers";
import PlayerStats from "../components/PlayerStats";
import RecentMatches from "../components/RecentMatches";
import Records from "../components/Records";
import TotalStats from "../components/TotalStats";
import WLStats from "../components/WLStats";

const { Header, Content } = Layout;

const components = [
  { key: 1, name: "AllCounts", id: "AllCounts", component: AllCounts },
  { key: 2, name: "Histograms", id: "Histograms", component: Histograms },
  { key: 3, name: "Peers", id: "Peers", component: Peers },
  { key: 4, name: "PlayerStats", id: "PlayerStats", component: PlayerStats },
  {
    key: 5,
    name: "RecentMatches",
    id: "RecentMatches",
    component: RecentMatches,
  },
  { key: 6, name: "Records", id: "Records", component: Records },
  { key: 7, name: "TotalStats", id: "TotalStats", component: TotalStats },
  { key: 8, name: "WLStats", id: "WLStats", component: WLStats },
];

// eslint-disable-next-line react/prop-types
const ReportPage = ({ children }) => {
  const [middlePanelComponents, setMiddlePanelComponents] = useState([]);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSubmit = async (values) => {
    try {
      const obj = { objects: middlePanelComponents };
      const dataToSend = { ...values, ...obj };
      const response = await axios.post("http://localhost:3000/templates", {
        dataToSend,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      ></Header>
      <Content>
        <Row>
          <Col
            id="leftPanel"
            span={4}
            style={{ background: "#eee", height: "100vh" }}
          >
            {/* Left section (25%) */}
            {components.map(({ key, name, component: Component }) => (
              <Card key={key} style={{ margin: "10px" }}>
                {name}
              </Card>
            ))}
          </Col>
          <Col
            id="middlePanel"
            span={6}
            style={{
              background: "#ddd",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ background: "#bbb", height: "80%" }}>
              {/* Upper section (80% of middle section) */}
            </div>
            <div style={{ background: "#aaa", height: "20%" }}>
              {/* Lower section (20% of middle section) */}
              <Form
                form={form}
                onFinish={handleSubmit}
                style={{ margin: "10px" }}
              >
                <Form.Item
                  label="Template Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the template name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col
            id="rightPanel"
            span={14}
            style={{ background: "#ccc", height: "100vh" }}
          >
            {/* Right section (50%) */}
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ReportPage;
