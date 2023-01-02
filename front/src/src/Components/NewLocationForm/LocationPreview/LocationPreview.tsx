import { Cake, Place } from "@mui/icons-material";
import { Button, ButtonBase, Grid, Paper, Typography, Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";

interface VehiclePreview {
    carBrand: string, 
    carModel: string, 
    carYear: string, 
    town: string | null, 
    pricePerDay: string,
    image: File,
}

interface props {
    vehicle: VehiclePreview
}

const LocationPreview = (props: props) => {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (props.vehicle.image.name !== "image"){
            const url = URL.createObjectURL(props.vehicle.image);
            setImageUrl(url);
        }
    }, [props.vehicle.image]);

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
                <Grid container>
                    <StyledGridImg item>
                        <StyledButton>
                            {imageUrl.length ? <Img alt="Photo du vehicule" src={imageUrl} /> : <Skeleton variant="rectangular" width={128} height={128} /> }
                            
                        </StyledButton>
                    </StyledGridImg>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column">
                            <Grid item xs>
                                <Grid item display="flex">
                                    <Typography gutterBottom variant="h6" component="div" marginLeft="10px">
                                        {props.vehicle.carBrand ? 
                                            <>
                                                {props.vehicle.carBrand}
                                            </>
                                            
                                        : <Skeleton variant="text" width={100} />}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" marginLeft="6px">
                                        {props.vehicle.carModel ? 
                                            <>
                                                {props.vehicle.carModel}
                                            </>
                                            
                                        : <Skeleton variant="text" width={100}/>}
                                    </Typography>
                                </Grid>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" marginLeft="10px">
                                    {props.vehicle.carYear ? 
                                        <>
                                            <Cake sx={{mr: "5px"}}/>
                                            Année: {props.vehicle.carYear}
                                        </>
                                        
                                    : <Skeleton variant="text" width={60} />}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" marginLeft="10px">
                                    {props.vehicle.town ? 
                                        <>
                                            <Place sx={{mr: "5px"}} />
                                            {props.vehicle.town}
                                        </>
                                        
                                    : <Skeleton variant="text" width={100} />}
                                </Typography>
                            </Grid>
                        </Grid>
                        <StyledGridReservation item>
                            <Typography variant="subtitle1" component="div" sx={{textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                {props.vehicle.pricePerDay ? props.vehicle.pricePerDay + "XPF/jour" : <Skeleton variant="text" width="110px" />}
                            </Typography>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                <Button variant="contained" color="primary" sx={{width: "100%"}} disabled>
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

export default LocationPreview;