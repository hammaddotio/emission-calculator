import React from 'react'
import StationaryCombustionCalculator from './StationaryCombustionCalculator'
import StationaryCombustionCalculatedData from './StationaryCombustionCalculatedData'
import StationaryCombustionDescription from './StationaryCombustionDescription';

const StationaryCombustionWrapper: React.FC = () => {
    return (
        <div className='w-full'>
            <StationaryCombustionCalculator />
            <StationaryCombustionDescription />
            <StationaryCombustionCalculatedData />
        </div>
    )
}

export default StationaryCombustionWrapper
