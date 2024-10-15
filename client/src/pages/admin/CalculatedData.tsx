import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Input, Select, Spin } from 'antd';
import axios from 'axios';
import { headers } from '../../utils/api/apiHeaders';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';
import ViewCalculatedData from './../../components/admin/calculatedData/ViewCalculatedData';
import Main from '../../layouts/Main';
import { CALCULATORS_LIST_API } from './../../utils/api/apis';

const { Search } = Input;
const { Option } = Select;

const CalculatedData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userFilter, setUserFilter] = useState(null);
    const [calculatorTypeFilter, setCalculatorTypeFilter] = useState(null);
    const [users, setUsers] = useState([]); // Store unique usernames
    const [calculatorTypes, setCalculatorTypes] = useState([]); // Store unique calculator types

    useEffect(() => {
        const fetchCalculators = async () => {
            try {
                const response = await axios.get(`${CALCULATORS_LIST_API}`, headers);
                const combinedData = combineCalculatorData(response.data);
                setData(combinedData);
                setFilteredData(combinedData);

                // Extract unique users and calculator types
                const uniqueUsers = [...new Set(combinedData.map(item => item.username))];
                const uniqueCalculatorTypes = [...new Set(combinedData.map(item => item.calculatorType))];

                setUsers(uniqueUsers);
                setCalculatorTypes(uniqueCalculatorTypes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCalculators();
    }, []);

    const combineCalculatorData = (calculators) => {
        const combined = [];

        Object.entries(calculators).forEach(([key, value]) => {
            value.forEach(item => {
                combined.push({
                    username: item.user ? item.user.username : 'N/A',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    details: item,
                    calculatorType: key.charAt(0).toUpperCase() + key.slice(1),
                });
            });
        });

        return combined;
    };

    const handleSearch = (value) => {
        setSearchText(value);
        filterData(userFilter, calculatorTypeFilter, value);
    };

    const handleUserFilterChange = (value) => {
        setUserFilter(value);
        filterData(value, calculatorTypeFilter, searchText);
    };

    const handleCalculatorTypeFilterChange = (value) => {
        setCalculatorTypeFilter(value);
        filterData(userFilter, value, searchText);
    };

    const filterData = (userFilter, calculatorTypeFilter, searchText) => {
        const filtered = data.filter(item => {
            const matchesUser = !userFilter || item.username === userFilter;
            const matchesCalculatorType = !calculatorTypeFilter || item.calculatorType === calculatorTypeFilter;
            const matchesSearch = item.username.toLowerCase().includes(searchText.toLowerCase());

            return matchesUser && matchesCalculatorType && matchesSearch;
        });
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Calculator Type',
            dataIndex: 'calculatorType',
            key: 'calculatorType',
            sorter: (a, b) => a.calculatorType.localeCompare(b.calculatorType),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text, record) => {
                const updatedDate = new Date(text).toLocaleString();
                return (
                    <span>
                        {updatedDate}
                        {record.createdAt !== text && <span style={{ color: 'red' }}> (edited)</span>}
                    </span>
                );
            },
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <ViewCalculatedData data={record} />
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    {/* <Popconfirm
                        title="Are you sure you want to delete this?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm> */}
                </span>
            ),
        },
    ];

    const handleView = (record) => {
        console.log('View record:', record);
    };

    const handleEdit = (record) => {
        console.log('Edit record:', record);
    };

    const handleDelete = (record) => {
        console.log('Delete record:', record);
    };

    if (loading) return (
        <Loading />
    )
    if (error) return (
        <Error error={error} />
    );

    return (
        <Main>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <Search
                        placeholder="Search by username"
                        onSearch={handleSearch}
                        style={{ width: '100%', maxWidth: '300px', marginBottom: '16px' }}
                        allowClear
                    />
                    <div className="flex flex-wrap sm:flex-nowrap">
                        <Select
                            placeholder="Filter by Username"
                            style={{ width: '100%', maxWidth: '200px', marginRight: '8px', marginBottom: '16px' }}
                            onChange={handleUserFilterChange}
                            allowClear
                        >
                            {users.map(user => (
                                <Option key={user} value={user}>{user}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Filter by Calculator Type"
                            style={{ width: '100%', maxWidth: '200px', marginBottom: '16px' }}
                            onChange={handleCalculatorTypeFilterChange}
                            allowClear
                        >
                            {calculatorTypes.map(type => (
                                <Option key={type} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="createdAt"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </Main>
    );
};

export default CalculatedData;
