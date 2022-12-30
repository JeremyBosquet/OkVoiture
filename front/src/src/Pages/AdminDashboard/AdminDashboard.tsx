
import { Button, Typography } from '@mui/material';
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

	useEffect(() => {
		fetchApi('/api/v1/auth/admin/profile')
		.then((res) => {
			setUser(res.data);
			getAllData();
		}).catch(() => {
			localStorage.removeItem('token');
			navigate('/');
		})
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	}

	return (
		<>
			<Typography variant="h3">Dashboard</Typography>
			<Button variant="contained" onClick={() => {handleLogout()}}>Logout</Button>
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