import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { Card } from "antd";

class Histograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { steamid } = this.props;
    axios
      .get(
        `https://api.opendota.com/api/players/${steamid}/histograms/actions_per_min`
      )
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { data } = this.state;

    return (
      <Card title="Actions per minute">
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{
              value: "X Axis Title",
              position: "outsideBottom",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Y Axis Title",
              angle: -90,
              position: "outsideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="games" fill="#8884d8" />
          <Bar dataKey="win" fill="#82ca9d" />
        </BarChart>
      </Card>
    );
  }
}

export default Histograms;
