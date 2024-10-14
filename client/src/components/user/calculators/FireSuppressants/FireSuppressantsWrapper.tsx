import React from 'react'
import FireSuppressantsCalculatedData from './FireSuppressantsCalculatedData'
import FireSuppressantsCalculator from './FireSuppressantsCalculator'

const FireSuppressantsWrapper: React.FC = () => {
    return (
        <div>
            <FireSuppressantsCalculator />
            <FireSuppressantsCalculatedData />
        </div>
    )
}

export default FireSuppressantsWrapper
