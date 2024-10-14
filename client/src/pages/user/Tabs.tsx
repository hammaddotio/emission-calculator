import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Main from './../../layouts/Main';
import MobileCombustion from '../../components/user/calculators/MobileCombustion/MobileCombustionCalculator';
import StationaryCombustionWrapper from './../../components/user/calculators/StationaryCombustion/StationaryCombustionWrapper';
import FireSuppressantsWrapper from '../../components/user/calculators/FireSuppressants/FireSuppressantsWrapper';
import ACAndRefrigerantsWrapper from '../../components/user/calculators/ACAndRefrigerants/ACAndRefrigerantsWrapper';
import PurchasedGasWrapper from '../../components/user/calculators/PurchasedGas/PurchasedGasWrapper';
import ElectricitySupplyWrapper from '../../components/user/calculators/ElectricitySupply/ElectricitySupplyWrapper';

const onChange = (key: string) => {
    console.log(key);
};

const TabItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Mobile Combustion',
        children: <MobileCombustion />,
    },
    {
        key: '2',
        label: 'Stationary Combustion',
        children: <StationaryCombustionWrapper />,
    },
    {
        key: '3',
        label: 'Fire Suppressants',
        children: <FireSuppressantsWrapper />,
    },
    {
        key: '4',
        label: 'AC & Refrigerants',
        children: <ACAndRefrigerantsWrapper />,
    },
    {
        key: '5',
        label: 'Purchased Gas',
        children: <PurchasedGasWrapper />,
    },
    {
        key: '6',
        label: 'Electricity Supply',
        children: <ElectricitySupplyWrapper />,
    },
];

const FormTabs: React.FC = () => {
    return (
        <Main>
            <div className='mt-10 mx-20'>
                <Tabs defaultActiveKey="1" items={TabItems} onChange={onChange} />
            </div>
        </Main>
    )
}

export default FormTabs;