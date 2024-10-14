import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Button, message, Table } from 'antd';
import axios from 'axios';
import { ELECTRICITY_SUPPLY_API } from '../../../../utils/api/apis';

interface MonthData {
    description: string;
    electricityPurchased: number;
    emissionFactor: number;
    powerCompanySpecific: number;
    emissions: number;
}

const ElectricitySupplyCalculator: React.FC = () => {
    const defaultEmissionFactor = 0.7;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [companyName, setCompanyName] = useState<string>('');
    const [facilityData, setFacilityData] = useState<MonthData[]>(Array(12).fill({
        description: '',
        electricityPurchased: 0,
        emissionFactor: defaultEmissionFactor,
        powerCompanySpecific: 0,
        emissions: 0
    }));
    const [totalEmissions, setTotalEmissions] = useState<number>(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Handle company name input
    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(e.target.value);
    };

    // Handle input changes and update facility data accordingly
    const handleInputChange = (value: any, field: string, index: number) => {
        const updatedFacilityData = [...facilityData];
        updatedFacilityData[index] = {
            ...updatedFacilityData[index],
            [field]: value,
        };
        // Calculate emissions for the updated row
        updatedFacilityData[index].emissions = (updatedFacilityData[index].electricityPurchased * updatedFacilityData[index].emissionFactor) / 1000;

        setFacilityData(updatedFacilityData);
    };

    // useEffect to recalculate total emissions whenever facilityData changes
    useEffect(() => {
        calculateTotalEmissions(facilityData);
        checkIfButtonShouldBeEnabled(facilityData);
    }, [facilityData]);

    // Calculate total emissions
    const calculateTotalEmissions = (data: MonthData[]) => {
        const total = data.reduce((sum, month) => sum + month.emissions, 0);
        setTotalEmissions(total);
    };

    // Check if the button should be enabled (if any row is filled)
    const checkIfButtonShouldBeEnabled = (data: MonthData[]) => {
        const isAnyRowFilled = data.some(
            row => row.description || row.electricityPurchased || row.powerCompanySpecific
        );
        setIsButtonEnabled(isAnyRowFilled);
    };

    // Handle form submission and API call
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                companyName,
                facilityData,
                totalEmissions // Send total emissions in the API payload
            };
            // API call using Axios
            await axios.post(`${ELECTRICITY_SUPPLY_API}`, payload);

            message.success('Data submitted successfully!');
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
        },
        {
            title: 'Electricity Purchased (kWh)',
            dataIndex: 'electricityPurchased',
            key: 'electricityPurchased',
            render: (text: any, record: MonthData, index: number) => (
                <InputNumber
                    placeholder="Enter kWh"
                    value={record.electricityPurchased}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'electricityPurchased', index)}
                />
            )
        },
        {
            title: 'Emission Factor (kg CO₂e/kWh)',
            dataIndex: 'emissionFactor',
            key: 'emissionFactor',
            render: (text: any, record: MonthData, index: number) => (
                <InputNumber
                    placeholder="Emission Factor"
                    value={record.emissionFactor}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'emissionFactor', index)}
                />
            )
        },
        {
            title: 'Power Company Specific',
            dataIndex: 'powerCompanySpecific',
            key: 'powerCompanySpecific',
            render: (text: any, record: MonthData, index: number) => (
                <InputNumber
                    placeholder="Power Company Specific"
                    value={record.powerCompanySpecific}
                    min={0}
                    onChange={(value) => handleInputChange(value || 0, 'powerCompanySpecific', index)}
                />
            )
        },
        {
            title: 'Facility / Source Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string, record: MonthData, index: number) => (
                <Input
                    placeholder="Enter description"
                    value={record.description}
                    onChange={(e) => handleInputChange(e.target.value, 'description', index)}
                />
            )
        },
        {
            title: 'Indirect GHG Emissions (tonnes CO₂e)',
            dataIndex: 'emissions',
            key: 'emissions',
            render: (text: number) => text.toFixed(2)
        }
    ];

    // Prepare data for the table
    const dataSource = facilityData.map((month, index) => ({
        key: index,
        month: months[index],
        ...month,
    }));

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Electricity Supply Emissions Calculator</h2>
            <div className="mb-4">
                <Input
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                    className="mb-2 w-full"
                />
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            // bordered
            />

            <div className="mt-4 text-xl font-semibold text-center">
                Total Indirect GHG Emissions: {totalEmissions.toFixed(4)} tonnes CO₂e
            </div>

            <div className="mt-4 text-center">
                <Button
                    type="primary"
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                    loading={loading}
                    className="w-full"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default ElectricitySupplyCalculator;
