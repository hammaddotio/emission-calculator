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
        onReady: ({ chart }: any) => {
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
        < Column {...config} />
    );
};

export default BarChart;
