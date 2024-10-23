import React, { useState } from 'react';
import { Button, TextField, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import axios from 'axios';
import { MOBILE_COMBUSTION_API } from '../../../../utils/api/apis';
import { headers } from './../../../../utils/api/apiHeaders';
import { toast } from 'react-hot-toast';

interface FuelRecord {
    fuelType: string;
    amount: number; // Amount of fuel used in liters
    co2EmissionFactor: number; // CO₂ Emission Factor
    ch4EmissionFactor: number; // CH₄ Emission Factor
    n2oEmissionFactor: number; // N₂O Emission Factor
    co2Emissions: number; // CO₂ Emissions
    ch4Emissions: number; // CH₄ Emissions
    n2oEmissions: number; // N₂O Emissions
    totalEmissions: number; // Total emissions
}

const FuelEmissionCalculator: React.FC = () => {
    const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
    const [selectedFuelType, setSelectedFuelType] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const fuelOptions = [
        { label: 'Motor Gasoline', value: 'Motor Gasoline', co2EmissionFactor: 2.35, ch4EmissionFactor: 50, n2oEmissionFactor: 2 },
        { label: 'Gas/Diesel oil', value: 'Gas/Diesel oil', co2EmissionFactor: 2.775, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Bio diesel (100%)', value: 'Bio diesel', co2EmissionFactor: 1.928, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Natural Gas Liquid', value: 'Natural Gas Liquid', co2EmissionFactor: 1.574, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Ethanol (100%)', value: 'Ethanol (100%)', co2EmissionFactor: 2.776, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Liquefied Petroleum Gasses (LPG)', value: 'Liquefied Petroleum Gasses (LPG)', co2EmissionFactor: 1.653, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Aviation Gasoline', value: 'Aviation Gasoline', co2EmissionFactor: 2.224, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'Kerosene type jet fuel', value: 'Kerosene type jet fuel', co2EmissionFactor: 2.538, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
        { label: 'CNG', value: 'CNG', co2EmissionFactor: 2.78, ch4EmissionFactor: 0, n2oEmissionFactor: 0 },
    ];

    const handleFuelTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setSelectedFuelType(value);
        addNewRow(value);
    };

    const addNewRow = (fuelType: string) => {
        const selectedFuel = fuelOptions.find(option => option.value === fuelType);
        if (selectedFuel) {
            const newRecord: FuelRecord = {
                fuelType,
                amount: 0, // default amount is 0
                co2EmissionFactor: selectedFuel.co2EmissionFactor,
                ch4EmissionFactor: selectedFuel.ch4EmissionFactor,
                n2oEmissionFactor: selectedFuel.n2oEmissionFactor,
                co2Emissions: 0,
                ch4Emissions: 0,
                n2oEmissions: 0,
                totalEmissions: 0,
            };
            setFuelRecords([...fuelRecords, newRecord]); // Add new row
            setSelectedFuelType(undefined); // Clear selection after adding
        }
    };

    const handleChange = (index: number, field: keyof FuelRecord, value: string) => {
        const newRecords: any = [...fuelRecords];
        const parsedValue = parseFloat(value);

        newRecords[index][field] = parsedValue;

        if (field === 'amount') {
            const co2Emissions = (newRecords[index].amount * newRecords[index].co2EmissionFactor) / 1000;
            const ch4Emissions = (newRecords[index].amount * newRecords[index].ch4EmissionFactor) / (1000 * 1000) * 28;
            const n2oEmissions = (newRecords[index].amount * newRecords[index].n2oEmissionFactor) / (1000 * 1000) * 265;

            newRecords[index].co2Emissions = co2Emissions;
            newRecords[index].ch4Emissions = ch4Emissions;
            newRecords[index].n2oEmissions = n2oEmissions;
            newRecords[index].totalEmissions = co2Emissions + ch4Emissions + n2oEmissions;
        }

        setFuelRecords(newRecords);
    };

    const calculateTotals = () => {
        return fuelRecords.reduce(
            (totals, record) => {
                totals.co2Emissions += record.co2Emissions;
                totals.ch4Emissions += record.ch4Emissions;
                totals.n2oEmissions += record.n2oEmissions;
                totals.totalEmissions += record.totalEmissions;
                return totals;
            },
            { co2Emissions: 0, ch4Emissions: 0, n2oEmissions: 0, totalEmissions: 0 }
        );
    };

    const totals = calculateTotals();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = { fuelRecords, ...totals };
            const response = await axios.post(`${MOBILE_COMBUSTION_API}`, payload, headers);
            console.log(response)

            // Show success toast
            toast.success('Fuel records submitted successfully!');

            // Reset all state variables after successful submission
            setFuelRecords([]); // Reset fuel records to an empty array
            setSelectedFuelType(''); // Clear selected fuel type
            // Optionally reset other state variables if necessary
        } catch (error: any) {
            // Show error toast
            toast.error('Failed to submit fuel records. Please try again.');
        } finally {
            setLoading(false); // Stop loading state
        }
    };


    const isButtonDisabled = fuelRecords.length === 0 || fuelRecords.some(record => record.amount === 0);

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Fuel Emission Calculator</h1>

            <TextField
                select
                label="Select Fuel Type"
                value={selectedFuelType || ''}
                onChange={handleFuelTypeChange}
                variant="outlined"
                className="mb-4 w-full"
            >
                {fuelOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fuel Type</TableCell>
                        <TableCell>Amount (liters)</TableCell>
                        <TableCell>CO₂ Emission Factor</TableCell>
                        <TableCell>CH₄ Emission Factor</TableCell>
                        <TableCell>N₂O Emission Factor</TableCell>
                        <TableCell>CO₂ Emissions (kg)</TableCell>
                        <TableCell>CH₄ Emissions (kg)</TableCell>
                        <TableCell>N₂O Emissions (kg)</TableCell>
                        <TableCell>Total Emissions (kg CO₂e)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fuelRecords.map((record, index) => (
                        <TableRow key={record.fuelType}>
                            <TableCell>{record.fuelType}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={record.amount}
                                    onChange={(e) => handleChange(index, 'amount', e.target.value)}
                                    variant="outlined"
                                    className="w-full"
                                />
                            </TableCell>
                            <TableCell>{record.co2EmissionFactor}</TableCell>
                            <TableCell>{record.ch4EmissionFactor}</TableCell>
                            <TableCell>{record.n2oEmissionFactor}</TableCell>
                            <TableCell>{record.co2Emissions.toFixed(3)}</TableCell>
                            <TableCell>{record.ch4Emissions.toFixed(3)}</TableCell>
                            <TableCell>{record.n2oEmissions.toFixed(3)}</TableCell>
                            <TableCell>{record.totalEmissions.toFixed(3)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell>{totals.co2Emissions.toFixed(3)}</TableCell>
                        <TableCell>{totals.ch4Emissions.toFixed(3)}</TableCell>
                        <TableCell>{totals.n2oEmissions.toFixed(3)}</TableCell>
                        <TableCell>{totals.totalEmissions.toFixed(3)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isButtonDisabled || loading}
                className="mt-4"
            >
                {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
        </div>
    );
};

export default FuelEmissionCalculator;
