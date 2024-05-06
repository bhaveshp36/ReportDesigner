/* eslint-disable no-unused-vars */
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

import Player from "./Player";


const LayoutPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
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
      </Header>
      <Content
        style={{
          flex: 1,
          padding: "48px",
          display: "flex",
          height: "100vh",
        }}
      >
        <Player />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};
export default LayoutPage;
