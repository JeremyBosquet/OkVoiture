import react from 'react';
import { Grid } from '@mui/material';
import NewLocationForm from '../../Components/NewLocationForm/NewLocationForm';
import NavBar from '../../Components/NavBar/NavBar';

const NewLocationPage = () => {
    return (
        <>
            <NavBar />
            <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" >
                <NewLocationForm />
            </Grid>
        </>
    );
};

export default NewLocationPage;
