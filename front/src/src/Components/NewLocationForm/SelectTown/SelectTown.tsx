import react, { useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { Icommunes } from '../../../Interfaces/Fetch';

interface props {
    data: Icommunes[];
    form: any;
    setForm: any;
}

const SelectTown = (props: props) => {
    
    const getTown = () => {
        const town = props.data.map((town: Icommunes) => {
            return town.nom;
        });
        return town;
    };
    
    let towns = getTown();

    const handleChange = (e: any) => {
        console.log(e.target.selectTown);
    };


    return (
        <>
            <Autocomplete
                disablePortal
                id="selectTown"
                options={towns}
                noOptionsText="Ville introuvable"
                onChange={(e, value) => props.setForm({...props.form, town: value})}
                renderInput={(params) => <TextField {...params} label="Ville" fullWidth required />}
            />
        </>
    );
};

export default SelectTown;