import React from 'react'
import ElectricitySupplyCalculator from './ElectricitySupplyCalculator';
import ElectricitySupplyCalculatedData from './ElectricitySupplyCalculatedData';
import ElectricitySupplyDescription from './ElectricitySupplyDescription';

const ElectricitySupplyWrapper: React.FC = () => {
    return (
        <div>
            <ElectricitySupplyCalculator />
            <ElectricitySupplyDescription />
            <ElectricitySupplyCalculatedData />
        </div>
    )
}

export default ElectricitySupplyWrapper
