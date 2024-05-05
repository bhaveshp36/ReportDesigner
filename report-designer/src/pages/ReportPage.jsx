/* eslint-disable no-unused-vars */
import React from "react";
import { Layout, Menu, theme, Row, Col } from "antd";
const { Header, Content, Footer } = Layout;

import MiddleSection from "./MiddleSection";

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

// eslint-disable-next-line react/prop-types
const ReportPage = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
      >
        Header
      </Header>
      <Content>
        <Row>
          <Col
            id="leftPanel"
            span={6}
            style={{ background: "#eee", height: "100vh" }}
          >
            {/* Left section (25%) */}
          </Col>
          <Col
            id="middlePanel"
            span={6}
            style={{ background: "#ddd", height: "100vh" }}
          >
            <MiddleSection />
            {/* Middle section (25%) */}
          </Col>
          <Col
            id="rightPanel"
            span={12}
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
