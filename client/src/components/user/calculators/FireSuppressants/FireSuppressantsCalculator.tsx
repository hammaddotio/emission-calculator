import React, { useState, useEffect } from "react";
import { Table, Button, Select, message, Empty, Input, Typography } from "antd";
import axios from "axios";
import { FIRE_SUPPRESSANT_API } from "../../../../utils/api/apis";
import { headers } from "../../../../utils/api/apiHeaders";

interface GasData {
    key: string;
    gas: string;
    gwp: number;
    inventoryChange: number;
    transferredAmount: number;
    capacityChange: number;
    co2Equivalent: number;
}

const { Option } = Select;

const FireSuppressants: React.FC = () => {
    const initialData: GasData[] = [
        {
            key: "1",
            gas: "Carbon dioxide",
            gwp: 1,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "2",
            gas: "HFC-23",
            gwp: 12400,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "3",
            gas: "HFC-125",
            gwp: 3170,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "4",
            gas: "HFC-134a",
            gwp: 1300,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "5",
            gas: "HFC-227ea",
            gwp: 3350,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "6",
            gas: "HFC-236fa",
            gwp: 8060,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "7",
            gas: "PFC-14",
            gwp: 6630,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
        {
            key: "8",
            gas: "PFC-31-10",
            gwp: 9200,
            inventoryChange: 0,
            transferredAmount: 0,
            capacityChange: 0,
            co2Equivalent: 0,
        },
    ];

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [data, setData] = useState<GasData[]>(initialData);
    const [filteredData, setFilteredData] = useState<GasData[]>([]);
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({
        totalInventoryChange: 0,
        totalTransferredAmount: 0,
        totalCapacityChange: 0,
        totalCO2Equivalent: 0,
    });

    const handleInputChange = (
        value: string | number,
        key: string,
        field: keyof Omit<GasData, "gas" | "gwp" | "co2Equivalent">
    ) => {
        const numericValue = parseFloat(value as string) || 0;  // Convert to a number
        const updatedData = data.map((item) => {
            if (item.key === key) {
                const updatedItem = { ...item, [field]: numericValue };
                updatedItem.co2Equivalent =
                    updatedItem.gwp *
                    (updatedItem.inventoryChange +
                        updatedItem.transferredAmount +
                        updatedItem.capacityChange);
                return updatedItem;
            }
            return item;
        });
        setData(updatedData);
    };


    const calculateTotals = () => {
        const totalInventoryChange = filteredData.reduce(
            (sum, item) => sum + item.inventoryChange,
            0
        );
        const totalTransferredAmount = filteredData.reduce(
            (sum, item) => sum + item.transferredAmount,
            0
        );
        const totalCapacityChange = filteredData.reduce(
            (sum, item) => sum + item.capacityChange,
            0
        );
        const totalCO2Equivalent = filteredData.reduce(
            (sum, item) => sum + item.co2Equivalent,
            0
        );

        setTotals({
            totalInventoryChange,
            totalTransferredAmount,
            totalCapacityChange,
            totalCO2Equivalent,
        });
    };



    const checkAllInputsValid = () => {
        return filteredData.every(
            (item) =>
                item.inventoryChange > 0 &&
                item.transferredAmount > 0 &&
                item.capacityChange > 0
        );
    };

    useEffect(() => {
        setFilteredData(data.filter((item) => selectedKeys.includes(item.key)));
    }, [selectedKeys, data]);

    useEffect(() => {
        calculateTotals();
    }, [filteredData]);

    const handleSelectionChange = (value: string[]) => {
        setSelectedKeys(value);
    };

    const handleSubmit = async () => {
        try {
            console.log({ data: filteredData, ...totals });
            setLoading(true);
            const response = await axios.post(
                `${FIRE_SUPPRESSANT_API}`,
                { fireSuppressants: filteredData, ...totals },
                headers
            );
            message.success("Data successfully sent to the server.");
            console.log("Data sent to API:", response.data);
            setTotals({
                totalInventoryChange: 0,
                totalTransferredAmount: 0,
                totalCapacityChange: 0,
                totalCO2Equivalent: 0,
            })
            setFilteredData([])
            setSelectedKeys([])
        } catch (error) {
            message.error("Error sending data to the server.");
            console.error("Error sending data to API:", error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Gas",
            dataIndex: "gas",
            key: "gas",
            className: "text-left font-semibold",
        },
        { title: "GWP", dataIndex: "gwp", key: "gwp", className: "text-right" },
        {
            title: "Inventory Change (lb)",
            dataIndex: "inventoryChange",
            key: "inventoryChange",
            className: "text-right",
            render: (_: any, record: GasData) => (
                <Input
                    type={"number"}
                    value={record.inventoryChange}
                    min={0}
                    onChange={(e: any) =>
                        handleInputChange(e.target.value, record.key, "inventoryChange")
                    }
                    className="items-start"
                />
            ),
        },
        {
            title: "Transferred Amount (lb)",
            dataIndex: "transferredAmount",
            key: "transferredAmount",
            className: "text-right",
            render: (_: any, record: GasData) => (
                <Input
                    type={"number"}
                    value={record.transferredAmount}
                    min={0}
                    onChange={(e: any) =>
                        handleInputChange(e.target.value, record.key, "transferredAmount")
                    }
                    className="items-start"
                />
            ),
        },
        {
            title: "Capacity Change (lb)",
            dataIndex: "capacityChange",
            key: "capacityChange",
            className: "text-right",
            render: (_: any, record: GasData) => (
                <Input
                    type={"number"}
                    value={record.capacityChange}
                    min={0}
                    onChange={(e: any) =>
                        handleInputChange(e.target.value, record.key, "capacityChange")
                    }
                    className="items-start"
                />
            ),
        },
        {
            title: "CO₂ Equivalent Emissions (lb)",
            dataIndex: "co2Equivalent",
            key: "co2Equivalent",
            className: "text-right",
            render: (text: number) => (
                <div className="text-start">
                    {text.toFixed(2)}
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 mx-auto max-w-full bg-white rounded-lg shadow-lg border border-gray-300">
            <Typography.Title level={3} className="text-center mb-4 text-blue-600 font-semibold text-lg sm:text-2xl">
                Fire Suppressants CO₂ Calculator
            </Typography.Title>

            <Select
                onChange={handleSelectionChange}
                placeholder="Select gases"
                className="mb-4 w-full"
                size="large"
                mode="multiple"
            >
                {initialData.map((item) => (
                    <Option key={item.key} value={item.key}>
                        {item.gas}
                    </Option>
                ))}
            </Select>

            <div className="overflow-auto">
                <Table
                    columns={columns}
                    dataSource={selectedKeys.length >= 0 ? filteredData : []}
                    pagination={false}
                    locale={{
                        emptyText: (
                            <Empty description="No data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ),
                    }}
                    summary={() => (
                        <Table.Summary>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={2} className="font-bold text-gray-800">Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={3} className="text-right font-bold text-blue-700">
                                    {totals.totalInventoryChange}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4} className="text-right font-bold text-blue-700">
                                    {totals.totalTransferredAmount}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={5} className="text-right font-bold text-blue-700">
                                    {totals.totalCapacityChange}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={6} className="text-right font-bold text-blue-700">
                                    {totals.totalCO2Equivalent.toFixed(2)}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </div>



            {selectedKeys.length > 0 && (
                <>
                    <div className="">
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleSubmit}
                            className="mt-4 px-8"
                            disabled={!checkAllInputsValid()}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            )}
        </div>


    );
};

export default FireSuppressants;
