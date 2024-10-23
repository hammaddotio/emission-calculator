import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Button, message, Table, Typography } from 'antd';
import axios from 'axios';
import { ELECTRICITY_SUPPLY_API } from '../../../../utils/api/apis';
import { headers } from '../../../../utils/api/apiHeaders';

interface MonthData {
    description: string;
    electricityPurchased: number;
    emissionFactor: number;
    powerCompanySpecific: number;
    emissions: number;
}

const ElectricitySupplyCalculator: React.FC = () => {
    const defaultEmissionFactor = 0.7;
    const currentMonthIndex = new Date().getMonth(); // Get the current month index (0 = January, 11 = December)
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' }); // Get current month name

    const [companyName, setCompanyName] = useState<string>('');
    const [monthData, setMonthData] = useState<MonthData>({
        description: '',
        electricityPurchased: 0,
        emissionFactor: defaultEmissionFactor,
        powerCompanySpecific: 0,
        emissions: 0
    });
    const [totalEmissions, setTotalEmissions] = useState<number>(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Handle company name input
    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    // Handle input changes and update data accordingly
    const handleInputChange = (value: any, field: string) => {
        const updatedMonthData = {
            ...monthData,
            [field]: value,
        };
        // Calculate emissions for the updated row
        updatedMonthData.emissions = (updatedMonthData.electricityPurchased * updatedMonthData.emissionFactor) / 1000;

        setMonthData(updatedMonthData);
    };

    // useEffect to recalculate total emissions whenever monthData changes
    useEffect(() => {
        calculateTotalEmissions(monthData);
        checkIfButtonShouldBeEnabled(monthData);
    }, [monthData]);

    // Calculate total emissions
    const calculateTotalEmissions = (data: MonthData) => {
        setTotalEmissions(data.emissions);
    };

    // Check if the button should be enabled (if any row is filled)
    const checkIfButtonShouldBeEnabled = (data: MonthData) => {
        const isRowFilled: any = data.electricityPurchased && data.powerCompanySpecific && companyName;
        setIsButtonEnabled(isRowFilled);
    };

    // Handle form submission and API call
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                companyName,
                facilityData: [monthData], // Send monthData as an array of objects
                totalEmissions // Send total emissions in the API payload
            };

            // API call using Axios
            await axios.post(`${ELECTRICITY_SUPPLY_API}`, payload, headers);
            message.success('Data submitted successfully!');
            setMonthData({
                description: '',
                electricityPurchased: 0,
                emissions: 0,
                powerCompanySpecific: 0,
                emissionFactor: defaultEmissionFactor
            })
            setCompanyName('')
            setTotalEmissions(0)
        } catch (error) {
            message.error('Failed to submit data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Define columns for the table
    const columns = [
        {
            title: 'Billing Month',
            dataIndex: 'month',
            key: 'month',
            render: () => currentMonthName,
        },
        {
            title: 'Electricity Purchased (kWh)',
            dataIndex: 'electricityPurchased',
            key: 'electricityPurchased',
            render: (_: any) => (
                <InputNumber
                    placeholder="Enter kWh"
                    value={monthData.electricityPurchased}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'electricityPurchased')}
                />
            )
        },
        {
            title: 'Emission Factor (kg CO₂e/kWh)',
            dataIndex: 'emissionFactor',
            key: 'emissionFactor',
            render: (_: any) => (
                <InputNumber
                    placeholder="Emission Factor"
                    value={monthData.emissionFactor}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'emissionFactor')}
                />
            )
        },
        {
            title: 'Power Company Specific',
            dataIndex: 'powerCompanySpecific',
            key: 'powerCompanySpecific',
            render: (_: any) => (
                <InputNumber
                    placeholder="Power Company Specific"
                    value={monthData.powerCompanySpecific}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'powerCompanySpecific')}
                />
            )
        },
        {
            title: 'Facility / Source Description',
            dataIndex: 'description',
            key: 'description',
            render: (_: string) => (
                <Input
                    placeholder="Enter description"
                    value={monthData.description}
                    onChange={(e) => handleInputChange(e.target.value, 'description')}
                />
            )
        },
        {
            title: 'Territory Default Value (kg CO₂e/kWh)',
            dataIndex: 'emissions',
            key: 'emissions',
            render: (_: number) => monthData.emissions.toFixed(2)
        }
    ];

    // Prepare data for the table (only current month's data)
    const dataSource = [
        {
            key: currentMonthIndex,
            month: currentMonthName,
            ...monthData,
        }
    ];

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <Typography.Title level={3} className="text-center">
                Electricity Supply Emissions Calculator
            </Typography.Title>

            <div className="mb-4">
                <Input
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                    className="mb-2 w-full border border-gray-300 rounded focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                className=""
            />

            <div className="mt-4 text-xl font-semibold text-center text-gray-800">
                Total Indirect GHG Emissions: {totalEmissions.toFixed(4)} kg CO₂e/kWh
            </div>

            <div className="">
                <Button
                    type="primary"
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                    loading={loading}
                    className="mt-4 px-8"
                >
                    Submit
                </Button>
            </div>
        </div>



    );
};

export default ElectricitySupplyCalculator;
