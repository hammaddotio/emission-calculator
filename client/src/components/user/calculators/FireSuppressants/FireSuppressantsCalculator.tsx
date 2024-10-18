import React, { useState, useEffect } from "react";
import { Table, Button, Select, message, Empty, Input } from "antd";
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
        value: number,
        key: string,
        field: keyof Omit<GasData, "gas" | "gwp" | "co2Equivalent">
    ) => {
        const updatedData = data.map((item) => {
            if (item.key === key) {
                const updatedItem = { ...item, [field]: value };
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
                    onChange={(value: any) =>
                        handleInputChange(value || 0, record.key, "inventoryChange")
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
                    onChange={(value: any) =>
                        handleInputChange(value || 0, record.key, "transferredAmount")
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
                    onChange={(value: any) =>
                        handleInputChange(value || 0, record.key, "capacityChange")
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Fire Suppressants CO₂Calculator
            </h2>

            <div className="mb-6">
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select gases"
                    onChange={handleSelectionChange}
                >
                    {initialData.map((item) => (
                        <Option key={item.key} value={item.key}>
                            {item.gas}
                        </Option>
                    ))}
                </Select>
            </div>

            <Table
                columns={columns}
                dataSource={selectedKeys.length > 0 ? filteredData : []}
                pagination={false}
                className="border rounded-lg shadow-sm"
                locale={{
                    emptyText: (
                        <Empty description="No data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    ),
                }}
            // summary={() => (
            //     <Table.Summary.Row>
            //         <Table.Summary.Cell index={0}>Total Inventory Change: {totals.totalInventoryChange}</Table.Summary.Cell>
            //         <Table.Summary.Cell index={0}>Total Transferred Amount: {totals.totalTransferredAmount}</Table.Summary.Cell>
            //         <Table.Summary.Cell index={0}>Total Capacity Change: {totals.totalCapacityChange}</Table.Summary.Cell>
            //         <Table.Summary.Cell index={0}>Total CO₂Equivalent: {totals.totalCO2Equivalent.toFixed(2)}</Table.Summary.Cell>
            //     </Table.Summary.Row>
            // )
            // }
            />

            {selectedKeys.length > 0 && (
                <>
                    <div className="w-full p-4">
                        <p className="font-bold mb-2 flex justify-between">
                            <span>Total Inventory Change:</span>
                            <span className="">{totals.totalInventoryChange}</span>
                        </p>
                        <p className="font-bold mb-2 flex justify-between">
                            <span>Total Transferred Amount:</span>
                            <span className="">{totals.totalTransferredAmount}</span>
                        </p>
                        <p className="font-bold mb-2 flex justify-between">
                            <span>Total Capacity Change:</span>
                            <span className="">{totals.totalCapacityChange}</span>
                        </p>
                        <p className="font-bold mb-2 flex justify-between">
                            <span>Total CO₂ Equivalent:</span>
                            <span className="">{totals.totalCO2Equivalent.toFixed(2)}</span>
                        </p>
                    </div>

                    <div className="text-center mt-6">
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleSubmit}
                            style={{ width: "100%" }} // Set button width to 100%
                            disabled={!checkAllInputsValid()} // Disable button if not all inputs are valid
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
