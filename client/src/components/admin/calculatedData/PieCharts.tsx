import { Pie } from "@ant-design/charts";
import React from "react";
import { Select } from "antd";

// Define types for props
interface PieChartData {
  type: string;
  value: number;
}

interface User {
  _id: string;
  username: string;
}

interface PieChartProps {
  pieChartData: PieChartData[];
  users: User[];
  selectedUser: User;
  setSelectedUser: (value: string | null) => void;
}

const PieChart: React.FC<PieChartProps> = ({ pieChartData, users, setSelectedUser, selectedUser }) => {
  const config = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          const total = pieChartData.reduce((acc, item) => acc + item.value, 0);
          return `Total\n${total}`;
        },
      },
    },
  };



  return (
    <>
      {/* User selection dropdown */}


      {/* Pie Chart */}
      <Pie {...config} />
    </>
  );
};

export default PieChart;
