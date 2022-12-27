import react from 'react';
import { Grid } from '@mui/material';
import NewLocationForm from '../../Components/NewLocationForm/NewLocationForm';

const NewLocationPage = () => {
    return (
        <Grid container display="flex" alignItems="center" justifyContent="center" direction="column" >
        	<NewLocationForm />
        </Grid>
    );
};

export default NewLocationPage;
