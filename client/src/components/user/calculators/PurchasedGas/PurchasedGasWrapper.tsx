import React from 'react'
import FireSuppressantsCalculatedData from './PurchasedGasCalculatedData'
import FireSuppressantsCalculator from './PurchasedGasCalculator'
import PurchasedGasDescription from './PurchasedGasDescription';

const PurchasedGasWrapper: React.FC = () => {
    return (
        <div>
            <PurchasedGasDescription />
            <FireSuppressantsCalculator />
            <FireSuppressantsCalculatedData />
        </div>
    )
}

export default PurchasedGasWrapper
