import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import { postData } from '../../../API/Post';
import { Ivehicle } from '../../../Interfaces/Vehicle';
import { calcPrice, checkEmail, convertDateStringToDate, isInReservations } from '../../../utils/utils'

interface props {
    vehicle: Ivehicle;
}

const Reservation = (props: props) => {
    const dateStartDefault = (dayjs(new Date(convertDateStringToDate(props.vehicle.startDate))));
    const dateEndDefault = (dayjs(new Date(convertDateStringToDate(props.vehicle.endDate))));
    const [startDate, setStartDate] = useState<Dayjs | undefined>(dayjs(new Date()));
    const [endDate, setEndDate] = useState<Dayjs | undefined>(dayjs(new Date()));
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [result, setResult] = useState<{ error: string, success: string }>({
        error: "",
        success: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult({ success: "", error: "" });

        const firstName = e.currentTarget.firstName.value;
        const email = e.currentTarget.email.value;

        if (!firstName || !email || !startDate || !endDate) {
            setResult({ ...result, error: "Veuillez remplir tous les champs" });
            return;
        }

        // Verification de la syntax de l'email
        if (!checkEmail(email)) {
            setResult({ ...result, error: "Veuillez entrer un email valide" });
            return;
        }

        const newReservation = {
            firstName: firstName,
            email: email,
            startDate: startDate?.format('DD-MM-YYYY'),
            endDate: endDate?.format('DD-MM-YYYY'),
            locationId: props.vehicle.id
        }

        // Envoi des données au serveur via l'API
        setSubmitting(true);
        await postData('/api/v1/location/reservation', newReservation).then((data) => {
            setResult({ error: "", success: data.data?.message });
        }).catch((err) => {
            setResult({ success: "", error: err.response.data?.message });
        });
        setSubmitting(false);
    }

    // Fonction pour changer la date de début
    const handleChangeStart = (newValue: Dayjs | null) => {
        if (newValue === null) {
            setStartDate(undefined);
            return;
        }
        setStartDate(newValue);
    };
    
    // Fonction pour changer la date de fin
    const handleChangeEnd = (newValue: Dayjs | null) => {
        if (newValue === null) {
            setEndDate(undefined);
            return;
        }
        setEndDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <Grid container display="flex" justifyContent="space-around">
                <Grid item xs={11} display="flex" justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1.7} maxWidth="sm">
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2" align="center">Reservation de {props.vehicle.carBrand} {props.vehicle.carModel}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="firstName" id="firstName" label="Prénom" type="text" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="email" id="email" label="Email" type="email" variant="outlined" fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DesktopDatePicker
                                    label="Date de début"
                                    inputFormat="DD/MM/YYYY"
                                    disablePast={true}
                                    shouldDisableDate={(day) => {
                                        const dayString = day.format('DD-MM-YYYY');
                                        return isInReservations(props.vehicle.reservations, dayString);
                                    }}
                                    minDate={dateStartDefault}
                                    maxDate={dateEndDefault}
                                    value={startDate}
                                    onChange={handleChangeStart}
                                    renderInput={(params: any) => <TextField {...params} fullWidth required />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DesktopDatePicker
                                    label="Date de fin"
                                    inputFormat="DD/MM/YYYY"
                                    disablePast={true}
                                    shouldDisableDate={(day) => {
                                        const dayString = day.format('DD-MM-YYYY');
                                        return isInReservations(props.vehicle.reservations, dayString);
                                    }}
                                    minDate={startDate}
                                    maxDate={dateEndDefault}
                                    value={endDate}
                                    onChange={handleChangeEnd}
                                    renderInput={(params: any) => <TextField {...params} fullWidth required />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    {
                                        submitting ? <CircularProgress color="inherit" size={20} />
                                            :
                                            <>Reserver pour {calcPrice(props.vehicle.pricePerDay, startDate, endDate)}XPF</>
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {result.error && <Alert severity="error" >{result.error}</Alert>}
                                {result.success && <Alert severity="success">{result.success}</Alert>}
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </LocalizationProvider>
    )
}

export default Reservation;