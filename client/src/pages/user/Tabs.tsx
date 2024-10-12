import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Main from './../../layouts/Main';
import MobileCombustion from '../../components/user/calculators/MobileCombustion/MobileCombustionCalculator';
import StationaryCombustionWrapper from './../../components/user/calculators/StationaryCombustion/StationaryCombustionWrapper';
import ACAndRefrigerantsCalculator from './../../components/user/calculators/ACAndRefrigerants/ACAndRefrigerantsCalculator';

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
        label: 'AC & Refrigerants',
        children: <ACAndRefrigerantsCalculator />,
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