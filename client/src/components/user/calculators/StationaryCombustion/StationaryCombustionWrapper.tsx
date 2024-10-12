import React from 'react'
import StationaryCombustionCalculator from './StationaryCombustionCalculator'
import StationaryCombustionCalculatedData from './StationaryCombustionCalculatedData'

const StationaryCombustionWrapper: React.FC = () => {
    return (
        <div>
            <StationaryCombustionCalculator />
            <StationaryCombustionCalculatedData />
        </div>
    )
}

export default StationaryCombustionWrapper
