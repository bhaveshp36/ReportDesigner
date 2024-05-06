/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Layout,
  theme,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
} from "antd";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

import AllCounts from "../components/AllCounts";
import Histograms from "../components/Histograms";
import Peers from "../components/Peers";
import PlayerStats from "../components/PlayerStats";
import RecentMatches from "../components/RecentMatches";
import Records from "../components/Records";
import TotalStats from "../components/TotalStats";
import WLStats from "../components/WLStats";
import { CloseCircleOutlined } from "@ant-design/icons";
import MiddleSection from "./MiddleSection";
const { Option } = Select;

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
const ReportPage = () => {
  const { steamid } = useParams();
  console.log("steamid", steamid);

  const [middlePanelComponents, setMiddlePanelComponents] = useState([
    // { key: 4, name: "PlayerStats", id: "PlayerStats", component: PlayerStats },
    // { key: 1, name: "AllCounts", id: "AllCounts", component: AllCounts },
  ]);

  useEffect(() => {
    console.log(middlePanelComponents);
  }, [middlePanelComponents]);

  const [templates, setTemplates] = useState([]);

  // Fetch the templates when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/templates")
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  function handleSelectTemplate(key, value) {
    console.log("key", key);
    console.log("value", value);
    axios
      .get(`http://localhost:3000/templates/${value.key}`)
      .then((response) => {
        const objectsWithKeys = response.data.objects.map((object) => ({
          ...object,
          component: components.find((component) => component.id === object.id)
            .component,
        }));
        setMiddlePanelComponents(objectsWithKeys);
      })
      .catch((error) => {
        console.error("Error loading template:", error);
      });
  }

  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleSubmit = async (values) => {
    try {
      console.log("values", values);
      const obj = { objects: middlePanelComponents };
      const dataToSend = { ...values, ...obj };
      console.log("datatosend", dataToSend);
      const response = await axios.post(
        "http://localhost:3000/templates",
        dataToSend
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over) {
      setMiddlePanelComponents((items) => {
        const newItem = components.find((item) => item.id === active.id);

        // Check if the item already exists in the middlePanelComponents
        const exists = items.some((item) => item.id === newItem.id);

        // If the item exists, return the current state
        if (exists) {
          return items;
        }

        // If the item does not exist, return a new state with the new item added
        return [...items, newItem];
      });
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <Col
              id="leftPanel"
              span={4}
              style={{ background: "#eee", height: "100vh" }}
            >
              {/* Left section (25%) */}
              {components.map(({ key, name, id, component: Component }) => (
                <SortableItem key={key} id={id}>
                  <Card draggable style={{ margin: "10px" }}>
                    {name}
                  </Card>
                </SortableItem>
              ))}
            </Col>
            <SortableContext
              items={middlePanelComponents.map(({ id }) => id)}
              strategy={verticalListSortingStrategy}
            >
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
                <div style={{ background: "#bbb", height: "70%" }}>
                  {/* Upper section (80% of middle section) */}
                  {middlePanelComponents.length > 0 ? (
                    <div>
                      <MiddleSection
                        components={middlePanelComponents}
                        setComponents={setMiddlePanelComponents}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "1px dotted",
                        padding: "20px",
                        textAlign: "center",
                        margin: "10px",
                        height: "80%",
                      }}
                    >
                      Drag components here
                    </div>
                  )}
                </div>

                <div style={{ background: "#aaa", height: "30%" }}>
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
                      <Button
                        style={{ marginLeft: "10px" }}
                        type="primary"
                        onClick={() => setMiddlePanelComponents([])}
                      >
                        Clear All
                      </Button>
                    </Form.Item>
                    <Form.Item label="Template">
                      <Select onChange={handleSelectTemplate}>
                        {templates.map((template) => (
                          <Option key={template._id} value={template.name}>
                            {template.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </SortableContext>
          </DndContext>
          <Col
            id="rightPanel"
            span={14}
            style={{ background: "#ccc", height: "100vh", overflow: "auto" }} // Add overflow: auto here
          >
            {/* Right section (50%) */}
            {middlePanelComponents.length > 0 ? (
              middlePanelComponents.map(
                ({ key, name, component: Component }) => (
                  <div style={{ margin: "10px" }} key={key} className="card">
                    <Component steamid={steamid} />
                  </div>
                )
              )
            ) : (
              <div
                style={{
                  border: "1px dotted",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                No components here
              </div>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ReportPage;
