import React from 'react'
import FireSuppressantsCalculatedData from './FireSuppressantsCalculatedData'
import FireSuppressantsCalculator from './FireSuppressantsCalculator'
import FireSuppressantsDescription from './FireSuppressantsDescription';

const FireSuppressantsWrapper: React.FC = () => {
    return (
        <div>
            <FireSuppressantsDescription />
            <FireSuppressantsCalculator />
            <FireSuppressantsCalculatedData />
        </div>
    )
}

export default FireSuppressantsWrapper
