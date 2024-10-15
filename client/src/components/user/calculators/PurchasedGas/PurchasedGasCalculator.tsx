import React, { useState } from 'react';
import { Table, InputNumber, Button, message } from 'antd';
import axios from 'axios';
import { PURCHASED_GAS_API } from '../../../../utils/api/apis';
import { headers } from '../../../../utils/api/apiHeaders';

interface EmissionData {
    key: string;
    facilityDescription: string; // Description of the facility
    amountConsumed: number; // Amount of natural gas consumed (in cubic feet)
    co2EmissionFactor: number; // CO2 Emission factor (fixed at 53.6)
    ch4EmissionFactor: number; // CH4 Emission factor (kg/mmBtu)
    n2oEmissionFactor: number; // N2O Emission factor (g/mmBtu)
    indirectGHG: number; // Indirect GHG emissions in tonnes of kg CO₂e
}

// Initial data with only one row
const initialData: EmissionData[] = [
    {
        key: '1',
        facilityDescription: 'Purchased Gas 1',
        amountConsumed: 0,
        co2EmissionFactor: 53.06,
        ch4EmissionFactor: 0.001,
        n2oEmissionFactor: 0.00001,
        indirectGHG: 0,
    },
];

const EmissionsTable: React.FC = () => {
    const [data, setData] = useState<EmissionData[]>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    // Function to calculate Indirect GHG emissions
    const calculateIndirectGHG = (amountConsumed: number, co2EmissionFactor: number, ch4EmissionFactor: number, n2oEmissionFactor: number) => {
        return amountConsumed * (co2EmissionFactor + ch4EmissionFactor + (n2oEmissionFactor / 1000)); // Convert g/mmBtu to kg/mmBtu
    };

    const updateIndirectGHG = (updatedData: EmissionData[]) => {
        const updatedGHGData = updatedData.map(item => ({
            ...item,
            indirectGHG: calculateIndirectGHG(item.amountConsumed, item.co2EmissionFactor, item.ch4EmissionFactor, item.n2oEmissionFactor),
        }));
        setData(updatedGHGData);
    };

    const handleInputChange = (value: number, key: string, field: keyof Omit<EmissionData, 'key'>) => {
        if (value < 0) {
            message.error('Value cannot be less than 0.');
            return;
        }

        const updatedData = data.map(item => {
            if (item.key === key) {
                return { ...item, [field]: value || 0 }; // Default to 0 if no value provided
            }
            return item;
        });

        updateIndirectGHG(updatedData); // Recalculate indirect GHG after input change
        const hasZeroValue = updatedData.some(item => item.amountConsumed === 0);
        setIsSubmitDisabled(hasZeroValue);
    };

    const addNewRow = () => {
        const newRow: EmissionData = {
            key: (data.length + 1).toString(),
            facilityDescription: `Purchased Gas ${data.length + 1}`,
            amountConsumed: 0, // Default value for new row
            co2EmissionFactor: 53.06, // Fixed value
            ch4EmissionFactor: 0.001, // Fixed value
            n2oEmissionFactor: 0.00001, // Fixed value
            indirectGHG: 0,
        };
        setData([...data, newRow]);
        updateIndirectGHG([...data, newRow]); // Recalculate after adding a new row
    };

    // Function to remove a row
    const removeRow = (key: string) => {
        const updatedData = data.filter(item => item.key !== key);
        setData(updatedData);
        updateIndirectGHG(updatedData); // Recalculate after removing row
    };

    const totalGHG = data.reduce((sum, item) => sum + item.indirectGHG, 0);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Prepare data to send
            const totalEmissions = totalGHG; // Total of all emissions
            const rowData = data.map(item => ({
                facilityDescription: item.facilityDescription,
                amountConsumed: item.amountConsumed,
                co2EmissionFactor: item.co2EmissionFactor,
                ch4EmissionFactor: item.ch4EmissionFactor,
                n2oEmissionFactor: item.n2oEmissionFactor,
                indirectGHG: item.indirectGHG,
            }));

            console.log({ PurchasedGas: rowData, totalEmissions })

            // API submission using Axios
            const response = await axios.post(`${PURCHASED_GAS_API}`, {
                totalEmissions,
                PurchasedGas: rowData,
            }, headers);

            // Handle response from the server
            message.success(`${response.data.message}`);
        } catch (error: any) {
            message.error(`Failed to submit data: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Purchased Gases', dataIndex: 'facilityDescription', key: 'facilityDescription' },
        {
            title: 'Amount of Natural Gas Consumed (cubic feet)',
            dataIndex: 'amountConsumed',
            key: 'amountConsumed',
            render: (text: number, record: EmissionData) => (
                <InputNumber
                    value={text}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, record.key, 'amountConsumed')}
                />
            ),
        },
        { title: 'CO2 Emission Factor (kg/mmBtu)', dataIndex: 'co2EmissionFactor', key: 'co2EmissionFactor' },
        { title: 'CH4 Emission Factor (kg/mmBtu)', dataIndex: 'ch4EmissionFactor', key: 'ch4EmissionFactor' },
        { title: 'N2O Emission Factor (g/mmBtu)', dataIndex: 'n2oEmissionFactor', key: 'n2oEmissionFactor' },
        { title: 'Indirect GHG Emissions (tonnes kg CO₂e)', dataIndex: 'indirectGHG', key: 'indirectGHG' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: EmissionData) => (
                <Button type="link" onClick={() => removeRow(record.key)}>Remove</Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Purchased Gas</h2>
            <Button type="primary" onClick={addNewRow} className="mb-4">Add New Row</Button>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                summary={() => (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={5} className="font-semibold">Total</Table.Summary.Cell>
                            <Table.Summary.Cell>{totalGHG.toFixed(2)}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
            <div className="mt-4 text-center">
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={isSubmitDisabled}
                    className="w-full"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default EmissionsTable;
