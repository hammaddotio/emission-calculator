import React from 'react';
import { Tabs, Divider } from 'antd';
import UserLayout from './../../layouts/User';
import MobileCombustionWrapper from '../../components/user/calculators/MobileCombustion/MobileCombustionWrapper';
import StationaryCombustionWrapper from './../../components/user/calculators/StationaryCombustion/StationaryCombustionWrapper';
import FireSuppressantsWrapper from '../../components/user/calculators/FireSuppressants/FireSuppressantsWrapper';
import ACAndRefrigerantsWrapper from '../../components/user/calculators/ACAndRefrigerants/ACAndRefrigerantsWrapper';
import PurchasedGasWrapper from '../../components/user/calculators/PurchasedGas/PurchasedGasWrapper';
import ElectricitySupplyWrapper from '../../components/user/calculators/ElectricitySupply/ElectricitySupplyWrapper';

const { TabPane } = Tabs;

const FormTabs: React.FC = () => {
    const [activeKey, setActiveKey] = React.useState<string>('1');

    const handleChange = (key: string) => {
        setActiveKey(key);
    };

    const renderTabContent = () => {
        switch (activeKey) {
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
            <div className="w-full p-4 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="rounded-2xl  overflow-auto bg-gray-100 w-full max-w-full">
                    <Tabs
                        activeKey={activeKey}
                        onChange={handleChange}
                        className="flex justify-center space-x-4"
                        // tabBarStyle={{ backgroundColor: 'transparent', borderBottom: '0.5px solid rgb(209 213 219)', paddingBottom: '20px' }} // Remove default Ant Design tab styling
                        centered
                    >
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '1' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    Mobile Combustion
                                </span>
                            }
                            key="1"
                        />
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '2' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    Stationary Combustion
                                </span>
                            }
                            key="2"
                        />
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '3' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    Fire Suppressants
                                </span>
                            }
                            key="3"
                        />
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '4' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    AC & Refrigerants
                                </span>
                            }
                            key="4"
                        />
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '5' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    Purchased Gas
                                </span>
                            }
                            key="5"
                        />
                        <TabPane
                            tab={
                                <span
                                    className={`px-4 py-2 rounded-lg border ${activeKey === '6' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                                        }`}
                                >
                                    Electricity Supply
                                </span>
                            }
                            key="6"
                        />
                    </Tabs>
                    {/* <Divider /> */}

                    <div className="rounded-2xl p-4 bg-gray-100 shadow-lg overflow-auto">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default FormTabs;
