
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchApi } from '../../API/Fetch';
import LoginForm from '../../Components/Admin/LoginForm/LoginForm';
import RegisterForm from '../../Components/Admin/RegisterForm/RegisterForm';
import { IAdmin } from '../../Interfaces/Admin';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IAdmin | undefined>(undefined);

	useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchApi('/api/v1/auth/admin/profile')
            .then((res) => {
				setUser(res.data);
			}).catch(() => {
                localStorage.removeItem('token');
				navigate('/');
            })
        }
    }, []);

	return (
		<>
			<Typography variant="h3">Dashboard</Typography>
		</>
	);
};

export default AdminDashboard;