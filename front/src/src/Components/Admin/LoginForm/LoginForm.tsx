import React, { useState } from 'react';
import { Lock } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { postData } from '../../../API/Post';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../../utils/utils';

const LoginForm = () => {
	const navigate = useNavigate();
	const [result, setResult] = useState<{ success: string, error: string }>({
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

		if (!checkEmail(email)) {
			setResult({ ...result, error: "Veuillez entrer un email valide" });
			return;
		}

		const data = {
			email: email,
			password: password
		}

		await postData('/api/v1/auth/admin/login', data)
			.then((res) => {
				localStorage.setItem('token', res.data.data.access_token);
				setResult({ error: "", success: res.data.message });
				navigate('/admin/dashboard');
			})
			.catch((err) => {
				setResult({ error: err.response.data.message, success: "" });
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
					Connexion
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					{result.success && <Alert severity="success">{result.success}</Alert>}
					{result.error && <Alert severity="error">{result.error}</Alert>}
					<TextField
						margin="normal"
						id="email"
						name="email"
						label="Email"
						type="email"
						autoComplete="email"
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
						Se connecter
					</Button>
				</Box>
			</Box>
		</Container>

	);
}

export default LoginForm