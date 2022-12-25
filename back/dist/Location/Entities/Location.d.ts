import DatabaseImage from './DatabaseImage';
declare class Location {
    id: string;
    firstName: string;
    email: string;
    carBrand: string;
    carModel: string;
    carYear: number;
    town: string;
    startDate: string;
    endDate: string;
    pricePerDay: number;
    image?: DatabaseImage;
    imageId?: string;
    createdAt: Date;
}
export default Location;
