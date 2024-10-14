import React from 'react'
import ElectricitySupplyCalculator from './ElectricitySupplyCalculator';
import ElectricitySupplyCalculatedData from './ElectricitySupplyCalculatedData';

const ElectricitySupplyWrapper: React.FC = () => {
    return (
        <div>
            <ElectricitySupplyCalculator />
            <ElectricitySupplyCalculatedData />
        </div>
    )
}

export default ElectricitySupplyWrapper
