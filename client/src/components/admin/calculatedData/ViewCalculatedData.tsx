// ViewCalculatedData.js
import { useState } from 'react';
import { Modal, Button } from 'antd';

const ViewCalculatedData = ({ data }: any) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button onClick={showModal}>
                View
            </Button>
            <Modal
                title="Details"
                visible={visible}
                onCancel={handleClose}
                footer={[
                    <Button key="close" onClick={handleClose}>
                        Close
                    </Button>,
                ]}
            >
                <h3>Company Name: {data.companyName}</h3>
                <h4>Electricity Supplies:</h4>
                <ul>
                    {data.facilityData?.map((item: any) => (
                        <li key={item._id}>
                            <strong>Description:</strong> {item.description} <br />
                            <strong>Electricity Purchased:</strong> {item.electricityPurchased} kWh <br />
                            <strong>Emission Factor:</strong> {item.emissionFactor} <br />
                            <strong>Power Company Specific:</strong> {item.powerCompanySpecific} <br />
                            <strong>Emissions:</strong> {item.emissions} kg CO2 <br />
                        </li>
                    ))}
                </ul>
                <h4>Total Emissions: {data.totalEmissions} kg CO2</h4>
            </Modal>
        </>
    );
};

export default ViewCalculatedData;
