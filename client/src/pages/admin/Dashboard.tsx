import React, { useEffect, useState } from 'react';
import Main from '../../layouts/Main';
import Chart from './../../components/admin/Charts';
import { CALCULATORS_TOTAL_FOR_CHART_API, USER_API } from "../../utils/api/apis";
import axios from "axios";
import { headers } from "../../utils/api/apiHeaders";
import AllTotals from './../../components/admin/calculatedData/AllTotals';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';

// Define types for PieChartData and User
interface PieChartData {
    type: string;
    value: number;
}

interface User {
    _id: string;
    username: string;
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
            setUsers(response.data.users); // Assuming response.data contains the users array
            console.log(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users', error);
            setError('Failed to fetch users');
        }
    };

    // Updated fetchData function
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch data based on selected user ID
            const url = selectedUser ? `${CALCULATORS_TOTAL_FOR_CHART_API}/${selectedUser}` : `${CALCULATORS_TOTAL_FOR_CHART_API}`;
            const response = await axios.get(url, headers);
            console.log(response.data)


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
        fetchData(); // Fetch data for all users initially
    }, []);

    // Fetch pie chart data when the selected user changes
    useEffect(() => {
        fetchData(); // Refetch data when selectedUser changes
    }, [selectedUser]);

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    return (
        <Main>
            <Chart
                pieChartData={pieChartData}
                users={users}
                setSelectedUser={setSelectedUser}
            />
            <AllTotals pieChartData={pieChartData} />
        </Main>
    );
};

export default Dashboard;
