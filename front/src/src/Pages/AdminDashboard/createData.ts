import { ILocation } from "../../Interfaces/Admin";

export function createData(
	email: string,
	firstName: string,
	nb_locations: number,
	nb_reservations: number,
	locations: ILocation[],
) {
	return {
		email,
		firstName,
		nb_locations,
		nb_reservations,
		locations: locations,
	};
}