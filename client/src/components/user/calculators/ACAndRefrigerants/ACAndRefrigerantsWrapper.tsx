import React from 'react'
import ACAndRefrigerantsCalculatedData from './ACAndRefrigerantsCalculatedData'
import ACAndRefrigerantsCalculator from './ACAndRefrigerantsCalculator'

const ACAndRefrigerantsWrapper: React.FC = () => {
    return (
        <div>
            <ACAndRefrigerantsCalculator />
            <ACAndRefrigerantsCalculatedData />
        </div>
    )
}

export default ACAndRefrigerantsWrapper
