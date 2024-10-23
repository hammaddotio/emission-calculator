import React from 'react';
import { Card, Typography } from '@mui/material'; // Import MUI components
import { styled } from '@mui/system';

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

const MobileCombustionDescription: React.FC = () => {
    return (
        <StyledCard className="w-full max-w-full mx-auto">
            <Typography variant="h6" component="h2" color="primary">
                Mobile Combustion Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
                <strong>Note:</strong> It includes fuel combustion sources that are used to produce electricity, steam, heat, and power. The onsite boilers, ovens, furnaces, and generators are typically classified under stationary combustion sources, and they fall under the category of Scope-1 GHG emissions.
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
                By adding the amount of fuel consumed and applying the given emission factors, the organization can calculate its GHG emissions from its stationary sources.
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
                <strong>Instruction:</strong> Add the amount of fuel used, fuel and vehicle type, and the total kg CO₂e will be calculated at the end.
            </Typography>
        </StyledCard>
    );
};

export default MobileCombustionDescription;
