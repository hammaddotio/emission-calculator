import React, { useEffect, useState } from 'react';
import Main from '../../layouts/Main';
import { Table, Input, Pagination, Button, Space, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_API } from '../../utils/api/apis'; // import the user API
import ViewUser from './../../components/admin/users/ViewUser';
import EditUser from '../../components/admin/users/EditUser';
import DeleteUser from './../../components/admin/users/DeleteUser';
import { headers } from '../../utils/api/apiHeaders';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';

interface User {
    _id: string;
    username: string;
    email: string;
    user_role: 'admin' | 'user';
    createdAt: string; // Assuming createdAt is the field for the date of creation
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10); // Define page size

    // Fetch all users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(USER_API, headers);
            const sortedUsers = response.data.data.sort(
                (a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            console.log(response.data.data);
            setUsers(sortedUsers);
            setFilteredUsers(sortedUsers);
        } catch (error: null | any) {
            if (error.response.status === 429) {
                console.log(error.response)
                return setError(error.response.data)
            }
            // if(error.response.status === 401)
            setError(error.response.data.error)
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchUsers();
    }, []);

    // Handle search input
    useEffect(() => {
        const filteredData = users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredData);
        setCurrentPage(1); // Reset to the first page when searching
    }, [searchTerm, users]);

    // Handle pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Columns for the table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
            sorter: (a: User, b: User) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: User) => (
                <Space size="large">
                    {/* View Button */}
                    <ViewUser user={record} />

                    {/* Update Button */}
                    <EditUser user={record} fetchUsers={fetchUsers} />

                    {/* Remove Button */}
                    <DeleteUser user={record} fetchUsers={fetchUsers} />
                </Space>
            ),
        },
    ];

    // Paginated data for the table
    const paginatedData = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    if (loading) return (
        <Loading />
    )
    if (error) return (
        <Error error={error} />
    );


    return (
        <Main>
            <div className='container mx-auto w-4/5 my-10'>
                <h1 className="text-2xl mb-4">Users</h1>

                {/* Search Input */}
                <Input.Search
                    placeholder="Search users by name or email"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px', width: '300px' }}
                />

                {/* Table for displaying users */}
                <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    loading={loading}
                    pagination={false} // Disable Ant Design pagination to use custom pagination
                />

                {/* Pagination */}
                <Pagination
                    current={currentPage}
                    total={filteredUsers.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    style={{ marginTop: '20px', textAlign: 'right' }}
                />
            </div>
        </Main>
    );
};

export default Users;
