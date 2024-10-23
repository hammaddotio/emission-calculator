import React, { useEffect, useState } from 'react';
import PieChart from '../../components/admin/calculatedData/PieCharts';
import BarChart from '../../components/admin/calculatedData/BarChart';
import { CALCULATORS_TOTAL_FOR_CHART_API, USER_API } from "../../utils/api/apis";
import axios from "axios";
import AllTotals from './../../components/admin/calculatedData/AllTotals';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';
import { headers } from './../../utils/api/apiHeaders';
import AddNewUser from '../../components/admin/users/AddNewUser';
import AdminLayout from '../../components/admin/Sidebar';
import { message } from 'antd';
import { Select } from 'antd'; Select

// Define types for PieChartData and User
interface PieChartData {
    type: string;
    value: number;
}

interface User {
    _id: string;
    username: string;
}

interface CreateUser {
    username: string;
    email: string;
    password: string;
}

const Dashboard: React.FC = () => {
    const [pieChartData, setPieChartData] = useState<PieChartData[] | any>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null | any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(USER_API, headers); // Update with your user API endpoint
            setUsers(response.data.data); // Assuming response.data contains the users array
        } catch (error) {
            console.error('Failed to fetch users', error);
            setError('Failed to fetch users');
        }
    };

    // Fetch chart data
    const fetchChartData = async () => {
        setLoading(true);
        try {
            // Fetch data based on selected user ID
            const url = selectedUser ? `${CALCULATORS_TOTAL_FOR_CHART_API}/${selectedUser}` : CALCULATORS_TOTAL_FOR_CHART_API;
            const response = await axios.get(url, headers);
            console.log(response.data)

            // Transform the response data into the desired format for the pie chart
            const transformedData: PieChartData[] = Object.entries(response.data).map(([key, value]) => ({
                type: key,
                value: value as number, // Explicitly cast the value to number
            }));
            setPieChartData(transformedData);
        } catch (error) {
            setError('Failed to fetch data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch users and pie chart data when the component mounts
    useEffect(() => {
        fetchUsers();
        fetchChartData(); // Fetch data for all users initially
    }, []);

    // Fetch pie chart data when the selected user changes
    useEffect(() => {
        fetchChartData(); // Refetch data when selectedUser changes
    }, [selectedUser]);

    // Function to add a new user
    const addNewUser = async (payload: CreateUser) => {
        setLoading(true);
        try {
            const response = await axios.post(USER_API, payload, headers);
            message.success(response.data.message);
            fetchUsers();
            fetchChartData();
        } catch (error: null | any) {
            setError('Failed to add user');
            console.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    return (
        <AdminLayout>
            <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <div className="flex items-center">
                        <Select
                            className="w-full md:w-60 p-2 text-black bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Select a user"
                            onChange={setSelectedUser}
                            value={selectedUser?.username}
                            allowClear
                        >
                            <Select.Option value={null}>All Users</Select.Option>
                            {users?.map((user) => (
                                <Select.Option key={user?._id} value={user?._id}>
                                    {user?.username}
                                </Select.Option>
                            ))}
                        </Select>
                        <AddNewUser addNewUser={addNewUser} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg p-4">
                    {/* Right Column - Manage Users, Bar Chart, and Pie Chart */}
                    <div className="flex flex-col min-w-full lg:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Bar Chart */}
                            <div className="p-4 bg-white rounded-lg shadow hover:shadow-2xl transform transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">User Activity</h3>
                                <div className="max-w-full">
                                    <BarChart barChartData={pieChartData} />
                                </div>
                            </div>

                            {/* Pie Chart */}
                            <div className="p-4 bg-white rounded-lg shadow hover:shadow-2xl transform transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">User Distribution</h3>
                                <PieChart
                                    pieChartData={pieChartData}
                                    users={users}
                                    setSelectedUser={setSelectedUser}
                                    selectedUser={selectedUser}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <AllTotals pieChartData={pieChartData} />
            </div>
        </AdminLayout>

    );
};

export default Dashboard;



/*
*/