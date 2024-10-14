import React from 'react'
import FireSuppressantsCalculatedData from './PurchasedGasCalculatedData'
import FireSuppressantsCalculator from './PurchasedGasCalculator'

const PurchasedGasWrapper: React.FC = () => {
    return (
        <div>
            <FireSuppressantsCalculator />
            <FireSuppressantsCalculatedData />
        </div>
    )
}

export default PurchasedGasWrapper
