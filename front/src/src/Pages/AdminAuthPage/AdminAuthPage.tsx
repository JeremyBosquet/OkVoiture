import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getExistAdmin } from '../../API/Fetch';
import LoginForm from '../../Components/Admin/LoginForm/LoginForm';
import RegisterForm from '../../Components/Admin/RegisterForm/RegisterForm';

const AdminAuthPage = () => {
	const navigate = useNavigate();
	const { data, error } = getExistAdmin();

	const getProfile = async () => {
		await fetchApi('/api/v1/auth/admin/profile')
		.then(() => {
			navigate('/admin/dashboard');
		}).catch(() => {
			localStorage.removeItem('token');
		})
	}
	
	useEffect(() => {
        if (localStorage.getItem('token'))
            getProfile();
    }, []);

	if (!data)
		return <RegisterForm />

	if (error)
		navigate('/');

	return (
		<>
			<LoginForm />
		</>
	);
};

export default AdminAuthPage;