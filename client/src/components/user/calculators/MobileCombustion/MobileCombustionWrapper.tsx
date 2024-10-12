import React from 'react'
import Co2CalculatedData from './MobileCombustionCalculatedData'
import CO2Calculator from './MobileCombustionCalculator';

const Co2Wrapper: React.FC = () => {
    return (
        <div>
            <CO2Calculator />
            <Co2CalculatedData />
        </div>
    )
}

export default Co2Wrapper
