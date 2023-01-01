export interface IAdmin {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
}

export interface ILocation {
    id: string;
    firstName: string;
    email: string;
    carBrand: string;
    carModel: string;
    carYear: number;
    town: string;
    pricePerDay: number;
    startDate: string;
    endDate: string;
    reservations: Ireservation[];
    createdAt: Date;
}

export interface Ireservation {
    firstName: string;
    email: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    createdAt: Date;
}

export interface IRenter {
    id: string;
    firstName: string;
    email: string;
    createdAt: Date;
}

export interface RenterData {
    renter: IRenter,
    locations: ILocation[],
    nb_reservations: number
}

export interface rowData {
    email: string;
    firstName: string;
    nb_locations: number;
    nb_reservations: number;
    locations: ILocation[];
}