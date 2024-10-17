import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Input, Select } from 'antd';
import axios from 'axios';
import { headers } from '../../utils/api/apiHeaders';
import Loading from '../../common/extra/Loading';
import Error from '../../common/extra/Error';
import ViewCalculatedData from './../../components/admin/calculatedData/ViewCalculatedData';
import Main from '../../layouts/Main';
import { CALCULATORS_LIST_API } from './../../utils/api/apis';

const { Search } = Input;
const { Option } = Select;

// Define the shape of the calculator data
interface CalculatorData {
    username: string;
    createdAt: string; // or Date if you prefer
    updatedAt: string; // or Date if you prefer
    details: any; // Define a more specific type if you know the structure
    calculatorType: string;
}

// Define the component
const CalculatedData: React.FC = () => {
    const [data, setData] = useState<CalculatorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredData, setFilteredData] = useState<CalculatorData[]>([]);
    const [userFilter, setUserFilter] = useState<string | null>(null);
    const [calculatorTypeFilter, setCalculatorTypeFilter] = useState<string | null>(null);
    const [users, setUsers] = useState<string[]>([]); // Store unique usernames
    const [calculatorTypes, setCalculatorTypes] = useState<string[]>([]); // Store unique calculator types

    useEffect(() => {
        const fetchCalculators = async () => {
            try {
                const response = await axios.get<CalculatorData[]>(`${CALCULATORS_LIST_API}`, headers);
                const combinedData = combineCalculatorData(response.data);
                setData(combinedData);
                setFilteredData(combinedData);

                // Extract unique users and calculator types
                const uniqueUsers = [...new Set(combinedData.map(item => item.username))];
                const uniqueCalculatorTypes = [...new Set(combinedData.map(item => item.calculatorType))];

                setUsers(uniqueUsers);
                setCalculatorTypes(uniqueCalculatorTypes);
            } catch (error: null | any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCalculators();
    }, []);

    const combineCalculatorData = (calculators: CalculatorData[]) => {
        const combined: CalculatorData[] = [];

        Object.entries(calculators).forEach(([key, value]: any) => {
            value.forEach((item: CalculatorData | any) => {
                combined.push({
                    username: item.user ? item.username : 'N/A',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    details: item,
                    calculatorType: key.charAt(0).toUpperCase() + key.slice(1),
                });
            });
        });

        return combined;
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        filterData(userFilter, calculatorTypeFilter, value);
    };

    const handleUserFilterChange = (value: string | null) => {
        setUserFilter(value);
        filterData(value, calculatorTypeFilter, searchText);
    };

    const handleCalculatorTypeFilterChange = (value: string | null) => {
        setCalculatorTypeFilter(value);
        filterData(userFilter, value, searchText);
    };

    const filterData = (userFilter: string | null, calculatorTypeFilter: string | null, searchText: string) => {
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
            sorter: (a: CalculatorData, b: CalculatorData) => a.username.localeCompare(b.username),
        },
        {
            title: 'Calculator Type',
            dataIndex: 'calculatorType',
            key: 'calculatorType',
            sorter: (a: CalculatorData, b: CalculatorData) => a.calculatorType.localeCompare(b.calculatorType),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => new Date(text).toLocaleString(),
            sorter: (a: CalculatorData, b: CalculatorData) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string, record: CalculatorData) => {
                const updatedDate = new Date(text).toLocaleString();
                return (
                    <span>
                        {updatedDate}
                        {record.createdAt !== text && <span style={{ color: 'red' }}> (edited)</span>}
                    </span>
                );
            },
            sorter: (a: CalculatorData, b: CalculatorData) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: CalculatorData) => (
                <span>
                    <ViewCalculatedData data={record} />
                    <Button type="default" onClick={() => handleEdit(record)}>Edit</Button>
                    {/* Uncomment this part if you want to enable delete functionality */}
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

    const handleView = (record: CalculatorData) => {
        console.log('View record:', record);
    };

    const handleEdit = (record: CalculatorData) => {
        console.log('Edit record:', record);
    };

    const handleDelete = (record: CalculatorData) => {
        console.log('Delete record:', record);
    };

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

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
