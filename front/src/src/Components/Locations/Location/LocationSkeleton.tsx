import { Button, ButtonBase, Grid, Paper, Typography, Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';

const LocationSkeleton = () => {

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
                            <Skeleton variant="rectangular" width={128} height={128} />
                        </StyledButton>
                    </StyledGridImg>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column">
                            <Grid item xs>
                                <Grid item display="flex">
                                    <Typography gutterBottom variant="h6" component="div" marginLeft="10px">
                                        <Skeleton variant="text" width={100} />
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" marginLeft="6px">
                                        <Skeleton variant="text" width={100}/>
                                    </Typography>
                                </Grid>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" marginLeft="10px">
                                    <Skeleton variant="text" width={60} />
                                </Typography>
                                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" marginLeft="10px">
                                    <Skeleton variant="text" width={100} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <StyledGridReservation item>
                            <Typography variant="subtitle1" component="div" sx={{textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <Skeleton variant="text" width="110px" />
                            </Typography>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                <Button variant="contained" color="primary" sx={{width: "100%"}} disabled>
                                    <Skeleton variant="text" width="70px" />
                                </Button>
                            </Typography>
                        </StyledGridReservation>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default LocationSkeleton;