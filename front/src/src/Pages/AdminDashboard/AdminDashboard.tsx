import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../../API/Fetch';
import Infos from '../../Components/Admin/Infos/Infos';
import LocationsTable from '../../Components/Admin/LocationsTable/LocationsTable';
import { IAdmin } from '../../Interfaces/Admin';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IAdmin | undefined>(undefined);
	const [data, setData] = useState<any>();


	const getAllData = async () => {
		await fetchApi('/api/v1/location/locationsAndReservations')
		.then((res) => {
			setData(res.data.data);
		})
	}

	const getProfile = async () => {
		await fetchApi('/api/v1/auth/admin/profile')
		.then((res) => {
			setUser(res.data.data);
			getAllData();
		}).catch(() => {
			localStorage.removeItem('token');
			navigate('/');
		})
	}

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/');
		}
		getProfile();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	}

	return (
		<>
			<Grid container p={2} sx={{
				p: 2,
				justifyContent: "space-between",
				alignItems: "center",
				"@media (max-width: 670px)": {
					display: "flex",
					justifyContent: "center",
					p: 1,
				}
			}}>
				<Typography variant="h4">Administration</Typography>
				<Grid item>
					<Button sx={{mr: 1}} variant="contained" color="inherit" onClick={() => {navigate('/')}}>Retour au site</Button>
					<Button variant="contained" color="error" onClick={() => {handleLogout()}}>Deconnexion</Button>
				</Grid>
			</Grid>
			{
				user && data ?
					<>
						<Infos data={data} />
						<LocationsTable data={data} />
					</>
				: null
			}

		</>
	);
};

export default AdminDashboard;