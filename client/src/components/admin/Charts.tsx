import { Pie } from "@ant-design/charts";
import React from "react";
import { Select } from "antd";
import Loading from "../../common/extra/Loading";
import Error from "../../common/extra/Error";

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
  setSelectedUser: (value: string | null) => void;
}

const PieChart: React.FC<PieChartProps> = ({ pieChartData, users, setSelectedUser }) => {
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
    <div className="mx-[64px] my-[32px]">
      {/* User selection dropdown */}
      <Select
        placeholder="Select a user"
        style={{ width: 200, marginBottom: "20px" }}
        onChange={setSelectedUser}
        allowClear
      >
        <Select.Option value={null}>All Users</Select.Option>
        {users.map((user) => (
          <Select.Option key={user._id} value={user._id}>
            {user.username}
          </Select.Option>
        ))}
      </Select>

      {/* Pie Chart */}
      <Pie {...config} />
    </div>
  );
};

export default PieChart;