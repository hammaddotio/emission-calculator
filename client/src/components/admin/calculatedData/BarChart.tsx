import React from 'react';
import { Column } from '@ant-design/plots';
import { Select } from 'antd';

interface BarChartData {
    type: string;
    value: number;
}

interface BarChartProps {
    barChartData: BarChartData[]; // Updated prop name to barChartData
}

const BarChart: React.FC<BarChartProps> = ({ barChartData }) => {
    const config = {
        data: barChartData,
        xField: 'type',
        yField: 'value',
        label: {
            position: 'middle', // Position of the label
            style: {
                fill: '#fff', // Label text color
                opacity: 0.6, // Label opacity
            },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        onReady: ({ chart }) => {
            try {
                const { height } = chart._container.getBoundingClientRect();
                const tooltipItem = barChartData[Math.floor(Math.random() * barChartData.length)];
                chart.on(
                    'afterrender',
                    () => {
                        chart.emit('tooltip:show', {
                            data: {
                                data: tooltipItem,
                            },
                            offsetY: height / 2 - 60,
                        });
                    },
                    true,
                );
            } catch (e) {
                console.error(e);
            }
        },
    };

    return (
        <div className="mx-[64px] my-[32px] w-1/3">
            {/* User selection dropdown */}
            {/* <Select
                placeholder="Select a user"
                style={{ width: 200, marginBottom: '20px' }}
                onChange={setSelectedUser}
                value={selectedUser ? selectedUser._id : null} // Extract the _id from selectedUser for value
                allowClear
            >
                <Select.Option value={null}>All Users</Select.Option>
                {users?.map((user) => (
                    <Select.Option key={user._id} value={user._id}>
                        {user.username}
                    </Select.Option>
                ))}
            </Select> */}

            {/* Bar Chart */}
            <Column {...config} />
        </div>
    );
};

export default BarChart;
