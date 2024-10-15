import { Pie } from "@ant-design/charts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Select, Button } from "antd";
import { headers } from "../../utils/api/apiHeaders";
import Loading from "../../common/extra/Loading";
import Error from "../../common/extra/Error";
import { CALCULATORS_COUNT_FOR_CHART_API, USER_API } from "../../utils/api/apis";

interface PieChartData {
  type: string;
  value: number;
}

interface User {
  id: string;
  username: string;
}

const PieChart = () => {
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      console.log(headers)
      const response = await axios.get(`${USER_API}`, headers); // Update with your user API endpoint
      setUsers(response.data.users); // Assuming response.data is an array of users
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  // Fetch data for the selected user
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${CALCULATORS_COUNT_FOR_CHART_API}/${selectedUser ? `${selectedUser}` : ''}`, headers); // Adjust API endpoint for user filtering
      console.log(response.data);

      // Transform the response data into the desired format
      const transformedData: PieChartData[] = Object.entries(response.data).map(([key, value]) => ({
        type: key,
        value: value
      }));

      setPieChartData(transformedData);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users and pie chart data when the component mounts
  useEffect(() => {
    fetchUsers();
    fetchData(); // Fetch data for all users initially
  }, []);

  // Fetch pie chart data when the selected user changes
  useEffect(() => {
    if (selectedUser !== null) {
      fetchData();
    }
  }, [selectedUser]);

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
        fontSize: 14
      }
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false as const,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        formatter: function formatter() {
          const total = pieChartData.reduce((acc, item) => acc + item.value, 0);
          return `total\n${total}`;
        }
      }
    }
  };

  if (loading) return (
    <Loading />
  )
  if (error) return (
    <Error error={error} />
  );


  return (
    <div className="mx-[64px] my-[32px]">
      <Select
        placeholder="Select a user"
        style={{ width: 200, marginBottom: '20px' }}
        onChange={setSelectedUser}
        allowClear
      >
        {users.map((user) => (
          <Select.Option key={user.id} value={user._id}>
            {user.username}
          </Select.Option>
        ))}
      </Select>

      <Pie {...config} />
    </div>
  );
};

export default PieChart;
