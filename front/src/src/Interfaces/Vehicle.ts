export interface Ivehicle {
    id: string,
    carBrand: string,
    carModel: string,
    carYear: number,
    town: string,
    pricePerDay: number,
    startDate: string,
    endDate: string,
    reservations: Ireservation[]
}

export interface Ireservation {
    startDate: string,
    endDate: string
}

export interface newVehicleForm {
    carBrand: string, 
    carModel: string, 
    carYear: string, 
    town: string | null, 
    pricePerDay: string, 
    image: File
}