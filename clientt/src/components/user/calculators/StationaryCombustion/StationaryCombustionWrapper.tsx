import React from 'react'
import StationaryCombustionCalculator from './StationaryCombustionCalculator'
import StationaryCombustionCalculatedData from './StationaryCombustionCalculatedData'
import StationaryCombustionDescription from './StationaryCombustionDescription';

const StationaryCombustionWrapper: React.FC = () => {
    return (
        <div>
            <StationaryCombustionDescription />
            <StationaryCombustionCalculator />
            <StationaryCombustionCalculatedData />
        </div>
    )
}

export default StationaryCombustionWrapper
