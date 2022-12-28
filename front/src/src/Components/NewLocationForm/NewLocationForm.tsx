import React, { useState } from 'react';
import react from 'react';
import { getTownFromPolynesia } from '../../API/Fetch';
import SelectTown from './SelectTown/SelectTown';
import { Alert, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { postData } from '../../API/Post';
import LocationPreview from './LocationPreview/LocationPreview';

const NewLocationForm = () => {
    const minDateStart = (dayjs(new Date()));
    const minDateEnd = (dayjs(new Date()));
    const [startDate, setStartDate] = useState<Dayjs | null>(minDateStart);
    const [endDate, setEndDate] = useState<Dayjs | null>(minDateEnd);
    const [imageUploaded, setImageUploaded] = useState<File | undefined>(undefined);

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [form, setForm] = useState<{carBrand: string, carModel: string, carYear: string, town: string, pricePerDay: string, image: File}>({
        carBrand: "",
        carModel: "",
        carYear: "",
        town: "",
        pricePerDay: "",
        image: new File([], "image")
    });

    
    const { data, error } = getTownFromPolynesia()
    const [result, setResult] = useState<{error: string, success: string}>({
        error: "",
        success: ""
    });
    
    if (error)
        return <div>Une erreur est survenue.</div>
    if (!data)
        return <div>Chargement...</div>

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setResult({ success: "", error: "" });

        const firstName = e.target.firstName.value;
        const email = e.target.email.value;
        const carBrand = e.target.carBrand.value;
        const carModel = e.target.carModel.value;
        const carYear = e.target.carYear.value;
        const town = e.target.selectTown.value;
        const pricePerDay = e.target.pricePerDay.value;

        // Verification des champs remplis
        if (firstName === "" || email === "" || carBrand === "" || carModel === "" || carYear === "" || town === "" || startDate === null || endDate === null || pricePerDay === "" || imageUploaded === undefined) {
            setResult({ ...result, error: "Veuillez remplir tous les champs" });
            return ;
        }

        // Verification de la syntax de l'email
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setResult({ ...result, error: "Veuillez entrer un email valide" });
            return ;
        }

        // Verification si la ville existe dans la liste des villes de Polynésie depuis la liste de l'API
        if (!data.find((t: any) => t.nom === town)) {
            setResult({ ...result, error: "Veuillez entrer une ville valide" });
            return ;
        }

        // Creation du formData pour l'envoi des données au serveur
        const formData = new FormData();

        // Ajout des données au formData
        formData.append('firstName', firstName);
        formData.append('email', email);
        formData.append('carBrand', carBrand);
        formData.append('carModel', carModel);
        formData.append('carYear', carYear);
        formData.append('town', town);
        formData.append('startDate', startDate.format('DD-MM-YYYY'));
        formData.append('endDate', endDate.format('DD-MM-YYYY'));
        formData.append('pricePerDay', pricePerDay);
        formData.append('image', imageUploaded);

        // Envoi des données au serveur via l'API
        setSubmitting(true);
        await postData('/api/v1/location', formData).then((data: any) => {
            setResult({ error: "", success: data.data?.message});

            // reset form
            e.target.reset();
            setStartDate(minDateStart);
            setEndDate(minDateEnd);
            setImageUploaded(undefined);
            setForm({carBrand: "",
                    carModel: "",
                    carYear: "",
                    town: "",
                    pricePerDay: "",
                    image: new File([], "image")})
        }).catch((err) => {
            setResult({ success: "", error: err.response.data?.message });
        });
        setSubmitting(false);
    }

    // Fonction pour changer la date de début
    const handleChangeStart = (newValue: Dayjs | null) => {
        setStartDate(newValue);
    };

    // Fonction pour changer la date de fin
    const handleChangeEnd = (newValue: Dayjs | null) => {
        setEndDate(newValue);
    };
    
    // Fonction pour changer les valeurs du formulaire pour le preview
    const changeForm = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Fonction pour changer l'image 
    const changeImage = (e: any) => {
        if (!e.target.files[0])
            return ;
        setForm({ ...form, image: e.target.files[0] });
        setImageUploaded(e.target.files[0]);
    }

    // Fonction pour modifier la valeur de l'année du vehicule pour le preview
    const handleYearChange = (e: any) => {
        const year = e.target.value;
        if (year.length > 4)
        {
            e.cancelEvent = true;
            return ;
        }
        setForm({ ...form, carYear: year });
    }

    // Fonction pour modifier la valeur du prix par jour pour le preview
    const handlePriceChange = (e: any) => {
        const price = e.target.value;
        if (price.length > 4)
        {
            e.cancelEvent = true;
            return ;
        }
        setForm({ ...form, pricePerDay: price });
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="h5" sx={{marginTop: "20px", marginBottom: "15px"}}>Proposer mon vehicule</Typography>
            {
                result.success !== "" && <Typography variant="body1" sx={{color: "green"}}>Votre vehicule est maintenant propos</Typography>
            }
            <Grid container display="flex" justifyContent="space-around">
                <Grid item xs={11} display="flex" justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1.7} maxWidth="sm">
                            <Grid item xs={12}>
                                <TextField name="firstName" id="firstName" label="Prénom" type="text" variant="outlined"  fullWidth required/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="email" id="email" label="Email" type="email" variant="outlined" fullWidth required/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="carBrand" id="carBrand" label="Marque du véhicule" type="text" variant="outlined" onChange={(e) => changeForm(e)} fullWidth required/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="carModel" id="carModel" label="Modele du véhicule" type="text" variant="outlined" onChange={(e) => changeForm(e)} fullWidth required/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="carYear" id="carYear" label="Année du véhicule" type="number" variant="outlined" onChange={handleYearChange} fullWidth required/>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectTown data={data} setForm={setForm} form={form} />
                            </Grid>
                                
                            <Grid item xs={12} sm={6}>
                                <DesktopDatePicker
                                    label="Date de début"
                                    inputFormat="DD/MM/YYYY"
                                    minDate={minDateStart}
                                    value={startDate}
                                    onChange={handleChangeStart}
                                    renderInput={(params: any) => <TextField {...params} fullWidth required/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DesktopDatePicker
                                    label="Date de fin"
                                    inputFormat="DD/MM/YYYY"
                                    minDate={minDateEnd}
                                    value={endDate}
                                    onChange={handleChangeEnd}
                                    renderInput={(params: any) => <TextField {...params} fullWidth required/>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="pricePerDay" id="pricePerDay" label="Prix par jour" type="number" variant="outlined"  onChange={handlePriceChange} fullWidth required/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" component="label" fullWidth> 
                                    Ajouter une photo du véhicule
                                    <input hidden accept="image/*" type="file" onChange={(e) => changeImage(e)} />
                                </Button>
                                { 
                                    imageUploaded && <Typography variant="h6">{imageUploaded.name}</Typography> 
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" component="label" fullWidth>
                                    {
                                        submitting ? <CircularProgress color="inherit" size={20} />
                                        : 
                                        <>Louer</>
                                    }
                                    <button hidden type="submit"></button>
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                { result.error && <Alert severity="error" >{result.error}</Alert> }
                                { result.success && <Alert severity="success">{result.success}</Alert> }
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <Grid container display="flex" direction="column" alignItems="center">
                    <Typography variant="h5" sx={{marginTop: "20px", marginBottom: "15px"}}>Aperçu</Typography>
                    <LocationPreview vehicle={form}/>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default NewLocationForm;