import Location from "../Entities/Location";
import Renter from "../Entities/Renter";
import { Reservation } from "./Location";

export interface RenterData {
    renter: Renter,
    locations: Location[],
    nb_reservations: number
}