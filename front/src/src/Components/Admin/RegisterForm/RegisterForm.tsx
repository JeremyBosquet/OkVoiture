import React, { useState } from 'react';
import { Lock } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { postData } from '../../../API/Post';

const RegisterForm = () => {
    const [result, setResult] = useState<{success: string, error: string}>({
        success: "",
        error: ""
    });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;

		if (email === '' || password === '') {
			return;
		}

        const data = {
            email: email,
            password: password
        }

        await postData('/api/v1/auth/admin/register', data)
        .then((response) => {
            setResult({error: "", success: response.data.message});
            setInterval(() => {
                window.location.reload();
            }, 4000);
        })
        .catch(() => {
            setResult({error: "Une erreur est survenue..", success: ""});
        });

    }

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Lock />
            </Avatar>
            <Typography component="h1" variant="h5">
                Nouveau administrateur
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                { result.success && <Alert severity="success">{result.success}</Alert> }
                { result.error && <Alert severity="error">{result.error}</Alert> }
                <TextField
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    fullWidth
                    required
                />
                <TextField
                    margin="normal"
                    id="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    autoComplete="password"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Créer
                </Button>
            </Box>
        </Box>
    </Container>

    );
}

export default RegisterForm