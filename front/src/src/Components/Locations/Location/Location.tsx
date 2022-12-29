import { Cake, Place } from "@mui/icons-material";
import { Button, ButtonBase, DialogActions, Dialog, DialogContent, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { Ivehicle } from "../../../Interfaces/Vehicle";
import Reservation from "./Reservation/Reservation";

interface props {
    vehicle: Ivehicle
}

const Location = (props: props) => {
    const [open, setOpen] = useState(false);
    const [openReservation, setOpenReservation] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleClickOpenReservation = () => {
        setOpenReservation(true);
      };
    
      const handleCloseReservation = () => {
        setOpenReservation(false);
      };
    
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

    const StyledButton = styled(ButtonBase)(({ theme }) => ({
        objectFit: "cover",
        width: 128,
        height: 128,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    }));

    const StyledGridImg = styled(Grid)(({ theme }) => ({
        display: "flex", 
        alignItems: "center",
        width: 128,
        height: 128,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    }));

    const StyledGridReservation = styled(Grid)(({ theme }) => ({
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
    }));

    return (
        <>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth="lg"
            >
                <DialogContent dividers>
                    <img alt="Photo du vehicule" src={import.meta.env.VITE_URL_API + "/api/v1/location/image/" + props.vehicle.id} width="100%" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                onClose={handleCloseReservation}
                open={openReservation}
                maxWidth="lg"
            >
                <DialogContent dividers>
                    <Reservation vehicle={props.vehicle} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseReservation}>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper
                sx={{
                p: 2,
                margin: 'auto',
                width: ["80%", "80%", "80%", "80%"],
                maxWidth: 650,
                borderRadius: "10px",
                flexGrow: 1,
                marginBottom: "20px",
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                elevation={2}
            >
                <Grid container spacing={2}>
                    <StyledGridImg item onClick={handleClickOpen}>
                        <StyledButton>
                            <Img alt="Photo du vehicule" src={import.meta.env.VITE_URL_API + "/api/v1/location/image/" + props.vehicle.id} />
                        </StyledButton>
                    </StyledGridImg>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" component="div">
                                    {props.vehicle.carBrand} {props.vehicle.carModel}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                    <Cake sx={{mr: "5px"}}/>
                                    Année: {props.vehicle.carYear}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                    <Place sx={{mr: "5px"}} />
                                    {props.vehicle.town}
                                </Typography>
                            </Grid>
                        </Grid>
                        <StyledGridReservation item>
                            <Typography variant="subtitle1" component="div" sx={{textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                {props.vehicle.pricePerDay}XPF/jour
                            </Typography>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                <Button variant="contained" color="primary" sx={{width: "100%"}} onClick={handleClickOpenReservation}>
                                    Réserver
                                </Button>
                            </Typography>
                        </StyledGridReservation>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Location;