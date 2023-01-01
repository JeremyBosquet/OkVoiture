import axios from 'axios';

export async function deleteApi(url : string, data = {}) {
    const response = await axios.delete(import.meta.env.VITE_URL_API + url, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    });
    return response;
}