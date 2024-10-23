import React from 'react'
import ACAndRefrigerantsCalculatedData from './ACAndRefrigerantsCalculatedData'
import ACAndRefrigerantsCalculator from './ACAndRefrigerantsCalculator'
import ACAndRefrigerantsDescription from './ACAndRefrigerantsDescription'

const ACAndRefrigerantsWrapper: React.FC = () => {
    return (
        <div>
            <ACAndRefrigerantsCalculator />
            <ACAndRefrigerantsDescription />
            <ACAndRefrigerantsCalculatedData />
        </div>
    )
}

export default ACAndRefrigerantsWrapper
