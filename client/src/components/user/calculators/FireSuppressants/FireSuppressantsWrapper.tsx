import React from 'react'
import FireSuppressantsCalculatedData from './FireSuppressantsCalculatedData'
import FireSuppressantsCalculator from './FireSuppressantsCalculator'
import FireSuppressantsDescription from './FireSuppressantsDescription';

const FireSuppressantsWrapper: React.FC = () => {
    return (
        <div>
            <FireSuppressantsCalculator />
            <FireSuppressantsDescription />
            <FireSuppressantsCalculatedData />
        </div>
    )
}

export default FireSuppressantsWrapper
