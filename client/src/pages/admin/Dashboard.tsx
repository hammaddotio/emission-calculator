import React, { useEffect, useState } from 'react';
import Main from '../../layouts/Main';
import PieChart from '../../components/admin/calculatedData/PieCharts';
import BarChart from '../../components/admin/calculatedData/BarChart';
import { CALCULATORS_TOTAL_FOR_CHART_API, USER_API } from "../../utils/api/apis";
import axios from "axios";
import AllTotals from './../../components/admin/calculatedData/AllTotals';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';
import { headers } from './../../utils/api/apiHeaders';
import AddNewUser from '../../components/admin/users/AddNewUser';
import { message } from 'antd';

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

    const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${USER_API}`, headers); // Update with your user API endpoint
            setUsers(response.data.data); // Assuming response.data contains the users array
        } catch (error) {
            console.error('Failed to fetch users', error);
            setError('Failed to fetch users');
        }
    };

    // Updated fetchChartData function
    const fetchChartData = async () => {
        setLoading(true);
        try {
            // Fetch data based on selected user ID
            const url = selectedUser ? `${CALCULATORS_TOTAL_FOR_CHART_API}/${selectedUser}` : `${CALCULATORS_TOTAL_FOR_CHART_API}`;
            const response = await axios.get(url, headers);


            // Transform the response data into the desired format for the pie chart
            const transformedData: PieChartData[] = Object.entries(response.data).map(([key, value]) => {
                return {
                    type: key,
                    value: value as number, // Explicitly cast the value to number
                };
            });
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



    const addNewUser = async (payload) => {
        setLoading(true);
        try {
            // Fetch data based on selected user ID
            const response = await axios.post(USER_API, payload, headers);
            console.log(response.data)
            message.success(response.data.message)
            fetchUsers();
            fetchChartData();

        } catch (error) {
            setError('Failed to fetch data');
            console.error(error?.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };


    console.log(pieChartData)
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return (
        <Main>
            <AddNewUser addNewUser={addNewUser} />
            <div className='flex gap-10'>
                <PieChart
                    pieChartData={pieChartData}
                    users={users}
                    setSelectedUser={setSelectedUser}
                    selectedUser={selectedUser}
                />
                <BarChart
                    barChartData={pieChartData}
                />
            </div>
            <AllTotals pieChartData={pieChartData} />
        </Main>
    );
};

export default Dashboard;
