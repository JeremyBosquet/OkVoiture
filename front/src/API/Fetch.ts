import { useFetch, useSingleQuery } from '@hazae41/xswr';
import { Icommunes } from '../Interfaces/Fetch';
 
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