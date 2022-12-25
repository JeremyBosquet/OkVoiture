import axios from 'axios';

export async function postData(url : string, data = {}) {
    const response = await axios.post(import.meta.env.VITE_URL_API + url, data);
    return response;
}