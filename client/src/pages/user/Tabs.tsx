import React from 'react';
import { Tabs, Tab } from '@mui/material'; // Keep MUI components for Tabs and Tab
import UserLayout from './../../layouts/User';
import MobileCombustionWrapper from '../../components/user/calculators/MobileCombustion/MobileCombustionWrapper';
import StationaryCombustionWrapper from './../../components/user/calculators/StationaryCombustion/StationaryCombustionWrapper';
import FireSuppressantsWrapper from '../../components/user/calculators/FireSuppressants/FireSuppressantsWrapper';
import ACAndRefrigerantsWrapper from '../../components/user/calculators/ACAndRefrigerants/ACAndRefrigerantsWrapper';
import PurchasedGasWrapper from '../../components/user/calculators/PurchasedGas/PurchasedGasWrapper';
import ElectricitySupplyWrapper from '../../components/user/calculators/ElectricitySupply/ElectricitySupplyWrapper';

const FormTabs: React.FC = () => {
    const [value, setValue] = React.useState<string>('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const renderTabContent = () => {
        switch (value) {
            case '1':
                return <MobileCombustionWrapper />;
            case '2':
                return <StationaryCombustionWrapper />;
            case '3':
                return <FireSuppressantsWrapper />;
            case '4':
                return <ACAndRefrigerantsWrapper />;
            case '5':
                return <PurchasedGasWrapper />;
            case '6':
                return <ElectricitySupplyWrapper />;
            default:
                return <MobileCombustionWrapper />;
        }
    };

    return (
        <UserLayout>
            <div className="w-full p-4 flex justify-center items-center min-h-screen">
                {/* Outer Box for Tabs and Content */}
                <div className="rounded-2xl shadow-lg overflow-auto bg-white w-full max-w-full">
                    {/* Tabs */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="inherit"
                        indicatorColor="primary"
                        centered={true}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: '#ffffff',
                        }}
                    >
                        <Tab className="text-white" label="Mobile Combustion" value="1" />
                        <Tab className="text-white" label="Stationary Combustion" value="2" />
                        <Tab className="text-white" label="Fire Suppressants" value="3" />
                        <Tab className="text-white" label="AC & Refrigerants" value="4" />
                        <Tab className="text-white" label="Purchased Gas" value="5" />
                        <Tab className="text-white" label="Electricity Supply" value="6" />
                    </Tabs>
                    {/* Content Box - Render Tab Content Here */}
                    <div className="rounded-2xl p-4 bg-gray-100 shadow-lg overflow-auto">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default FormTabs;