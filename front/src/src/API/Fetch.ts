import { useFetch, useSingleQuery } from '@hazae41/xswr';
import axios from 'axios';
import { Icommunes } from '../Interfaces/Fetch';
import { Ivehicle } from '../Interfaces/Vehicle';
 
async function fetchAsJson<T>(url: string) {
    const res = await fetch(url)
    const data = await res.json() as T
    return { data }
}

export function getTownFromPolynesia() {
  const query = useSingleQuery<Icommunes[]>(`https://geo.api.gouv.fr/departements/987/communes`, fetchAsJson)
  
  useFetch(query) // Fetch on mount and on url change
 
  return query
}

export function getVehicles(page : number) {
  const query = useSingleQuery<Ivehicle[]>(`${import.meta.env.VITE_URL_API}/api/v1/location/sortedByAscPrice`, fetchAsJson)
  
  useFetch(query) // Fetch on mount and on url change
 
  return query
}

export function getExistAdmin() {
  const query = useSingleQuery<boolean>(`${import.meta.env.VITE_URL_API}/api/v1/auth/admin/exist`, fetchAsJson)
  
  useFetch(query) // Fetch on mount and on url change
 
  return query
}

export async function fetchApi(url: string) {
  const query = await axios.get(`${import.meta.env.VITE_URL_API}` + url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
 
  return query;
}