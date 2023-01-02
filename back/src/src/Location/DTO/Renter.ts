import Location from "../Entities/Location";
import Renter from "../Entities/Renter";

export interface RenterData {
    renter: Renter,
    locations: Location[],
    nb_reservations: number
}