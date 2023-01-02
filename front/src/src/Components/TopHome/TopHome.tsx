import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TopHome = () => {
    return (
        <Grid container display="flex" alignItems="center" justifyContent="center">
            <Grid container display="flex" alignItems="center" justifyContent="center">
                <Grid item xs={6} md={3}>
                    <img src="/topHome.svg" alt="Voiture" width="auto" style={{maxWidth: 400}} />
                </Grid>

                <Grid item xs={10} ml={5} md="auto" sx={{
                    '@media (max-width: 900px)': {
                        marginLeft: 0,
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }
                }}>
                    <Typography variant="h3">OkVoiture</Typography>
                    <Typography variant="h5" sx={{
                        '@media (max-width: 900px)': {
                            textAlign: "center",
                        }
                    }}>Louer un véhicule n'a jamais été aussi simple.</Typography>
                    <Link to="/louer/un/vehicule" style={{textDecoration: "none", marginTop: 20}}><Button variant="contained" color="secondary">Louer un véhicule</Button></Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TopHome;