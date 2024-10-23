import React from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

// StyledCard definition using MUI's styled utility
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
}));

const ElectricitySupplyDescription: React.FC = () => {
    return (
        <StyledCard className="w-full max-w-full mx-auto bg-blue-50">
            <Typography variant="body1" color="text.primary">
                <Typography component="span" fontWeight="bold" color="primary.main">
                    Description:
                </Typography>
                This sheet is designed to calculate and quantify Scope 2 GHG emissions resulting from electricity consumption within an organization.
            </Typography>

            <Typography variant="body1" color="text.primary" mt={2}>
                Start by adding the company name and electricity units consumed. The calculation involves multiplying the total electricity consumption by the territory-wide default emission factor (expressed in kg CO₂e/kWh), which reflects the average emissions per unit of electricity in the region.
            </Typography>

            <Typography variant="body1" color="text.primary" mt={2}>
                <Typography component="span" fontWeight="bold" color="primary.main">
                    Note:
                </Typography>
                Add in the units consumed per month for the reporting year to calculate the emissions.
            </Typography>
        </StyledCard>
    );
}

export default ElectricitySupplyDescription;
