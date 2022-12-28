import react from 'react';
import { Grid } from '@mui/material';
import NewLocationForm from '../../Components/NewLocationForm/NewLocationForm';
import Navbar from '../../Components/Navbar/Navbar';

const NewLocationPage = () => {
    return (
        <>
            <Navbar />
            <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" >
                <NewLocationForm />
            </Grid>
        </>
    );
};

export default NewLocationPage;
