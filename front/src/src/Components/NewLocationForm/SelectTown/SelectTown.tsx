import { Autocomplete, TextField } from '@mui/material';
import { Icommunes } from '../../../Interfaces/Fetch';
import { newVehicleForm } from '../../../Interfaces/Vehicle';

interface props {
    data: Icommunes[];
    form: newVehicleForm;
    setForm: (form: newVehicleForm) => void;
}

const SelectTown = (props: props) => {
    
    // Recuperation de toutes les villes dans un tableau pour l'autocomplete
    const getTown = () => {
        const towns : string[] = props.data.map((town: Icommunes) => {
            return town.nom;
        });
        return towns;
    };
    
    const towns = getTown();

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