import react from 'react';
import { Grid, Typography } from '@mui/material';
import { getVehicles } from '../../API/Fetch';
import { Ivehicle } from '../../Interfaces/Vehicle';
import LocationsList from '../../Components/Locations/LocationsList/LocationsList';

const LocationsPage = () => {
    const { data, error } = getVehicles(0); 

    if (error)
        return (
            <Grid container display="flex" alignItems="center" justifyContent="center" direction="column">
                <Typography>Une erreur est survenue.</Typography>
            </Grid>
        ) 
    if (!data)
        return (
            <Grid container display="flex" alignItems="center" justifyContent="center" direction="column">
                <Typography>Chargement...</Typography>
            </Grid>
        )

    return (
        <Grid container display="flex" alignItems="center" justifyContent="center" direction="column">
            <Typography variant="h4">Nos locations</Typography>
            <Grid container display="flex" direction="column" justifyContent="center" alignItems="center" marginTop="20px">
                <LocationsList data={data} />
            </Grid>
        </Grid>
    );
};

export default LocationsPage;
