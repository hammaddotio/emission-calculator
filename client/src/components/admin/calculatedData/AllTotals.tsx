import React from 'react';
import { Table, Card, Typography } from 'antd'; // Ant Design components
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography; // Ant Design's Typography component for consistent text styles

interface AllTotalsProps {
    pieChartData: { type: string; total: number }[]; // Transformed data passed in as props
}

const AllTotals: React.FC<AllTotalsProps> = ({ pieChartData }) => {

    // Define columns for the table
    const columns: ColumnsType<{ type: string; total: number }> = [
        {
            title: 'Category',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <strong>{text}</strong>, // Bold text for categories
            // responsive: ['sm'], // Only show on small screens and above
        },
        {
            title: 'Total Value',
            dataIndex: 'value',
            key: 'value',
            align: 'right', // Align numbers to the right
            render: (value) => value.toFixed(2), // Add thousand separators for numbers
        },
    ];

    return (
        <div className="p-6 min-h-screen">
            <Card bordered={false} className="shadow-md">
                {/* <Title level={2} className="text-center mb-6">
                    Overview
                </Title> */}

                {/* Table wrapped in a card for a cleaner layout */}
                <Table
                    dataSource={pieChartData}
                    columns={columns}
                    rowKey="type"
                    // pagination={{ pageSize: 6 }} // Paginate for better performance with large data
                    scroll={{ x: 400 }} // Enable horizontal scroll if necessary
                // className="custom-table"
                />
            </Card>
        </div>
    );
};

export default AllTotals;
