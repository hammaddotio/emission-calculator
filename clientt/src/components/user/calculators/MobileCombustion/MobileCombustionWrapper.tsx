import React from 'react'
import MobileCombustionCalculatedData from './MobileCombustionCalculatedData'
import MobileCombustionCalculator from './MobileCombustionCalculator';
import MobileCombustionDescription from './MobileCombustionDescription';

const MobileCombustionWrapper: React.FC = () => {
    return (
        <div>
            <MobileCombustionDescription />
            <MobileCombustionCalculator />
            <MobileCombustionCalculatedData />
        </div>
    )
}

export default MobileCombustionWrapper
