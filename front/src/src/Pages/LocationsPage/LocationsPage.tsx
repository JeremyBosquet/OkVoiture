import { Grid, Typography } from '@mui/material';
import { getVehicles } from '../../API/Fetch';
import LocationsList from '../../Components/Locations/LocationsList/LocationsList';
import NavBar from '../../Components/NavBar/NavBar';
import TopHome from '../../Components/TopHome/TopHome';

const LocationsPage = () => {
    const { data, error } = getVehicles(); 

    if (error)
        return (
            <>
                <NavBar />
                <TopHome />
                <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" mt={5}>
                    <Typography variant="h4">Nos locations</Typography>
                    <Typography mx={3} textAlign="center" variant="h6" >Choisissez votre véhicule parmi nos nombreuses locations.</Typography>
                    <Typography>Une erreur est survenue..</Typography>
                </Grid>
            </>
        ) 
    if (!data)
        return (
            <>
                <NavBar />
                <TopHome />
                <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" mt={5}>
                    <Typography variant="h4">Nos locations</Typography>
                    <Typography mx={3} textAlign="center" variant="h6" >Choisissez votre véhicule parmi nos nombreuses locations.</Typography>
                    <Typography>Chargement en cours..</Typography>
                </Grid>
            </>
        )

    return (
        <>
            <NavBar />
            <TopHome />
            <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" mt={5}>
                <Typography variant="h4">Nos locations</Typography>
                <Typography mx={3} textAlign="center" variant="h6" >Choisissez votre véhicule parmi nos nombreuses locations.</Typography>
                <Grid container display="flex" direction="column" justifyContent="center" alignItems="center" marginTop="20px">
                    <LocationsList data={data} />
                </Grid>
            </Grid>
        </>
    );
};

export default LocationsPage;
