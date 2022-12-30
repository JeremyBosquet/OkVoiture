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
    email: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
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