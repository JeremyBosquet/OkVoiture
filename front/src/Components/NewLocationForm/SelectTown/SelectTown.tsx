import react, { useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Icommunes } from '../../../Interfaces/Fetch';

interface props {
    data: any;
}

const SelectTown = (props: props) => {
    
    const getTown = () => {
        const town = props.data.map((town: Icommunes) => {
            return town.nom;
        });
        return town;
    };
    
    let towns = getTown();

    return (
        <>
            <Autocomplete
                disablePortal
                id="selectTown"
                options={towns}
                noOptionsText="Ville introuvable"
                renderInput={(params) => <TextField {...params} label="Ville" fullWidth required />}
            />
        </>
    );
};

export default SelectTown;