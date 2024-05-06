/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from "react";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Table } from "antd";

import AllCounts from "../components/AllCounts";
import Histograms from "../components/Histograms";
import Peers from "../components/Peers";
import PlayerStats from "../components/PlayerStats";
import RecentMatches from "../components/RecentMatches";
import Records from "../components/Records";
import TotalStats from "../components/TotalStats";
import WLStats from "../components/WLStats";

const RowContext = React.createContext({});

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{
        cursor: "move",
      }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      listeners,
    }),
    [setActivatorNodeRef, listeners]
  );
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export const MiddleSection = ({ components, setComponents }) => {

  const handleAdd = (newComponent) => {
    setComponents((prevState) => {
      // Check if the component already exists in the state
      const exists = prevState.some((comp) => comp.key === newComponent.key);

      // If the component exists, return the current state
      if (exists) {
        return prevState;
      }

      // If the component does not exist, return a new state with the new component added
      return [...prevState, newComponent];
    });
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setComponents((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        const newArray = arrayMove(prevState, activeIndex, overIndex);

        // Update components prop to reflect the new order of items
        setComponents(newArray.map((item) => item.component));

        return newArray;
      });
    }
  };

  const columns = [
    {
      key: "sort",
      align: "center",
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: "Key",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button danger type="link" onClick={() => handleRemove(record.key)}>
          Remove
        </Button>
      ),
    },
  ];

  const handleRemove = (key) => {
    setComponents((prevState) =>
      prevState.filter((record) => record.key !== key)
    );
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={components.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          pagination={false}
          size="small"
          showHeader={false}
          style={{ margin: 10, padding: 0 }}
          rowKey="key"
          components={{
            body: {
              row: Row,
            },
          }}
          columns={columns}
          dataSource={components}
        />
      </SortableContext>
    </DndContext>
  );
};

export default MiddleSection;
