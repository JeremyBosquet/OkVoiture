/// <reference types="multer" />
export declare class newLocationDTO {
    firstName: string;
    email: string;
    carBrand: string;
    carModel: string;
    carYear: number;
    town: string;
    startDate: Date;
    endDate: Date;
    pricePerDay: number;
    image: Express.Multer.File;
}
export declare class idDto {
    id: string;
}
export interface INewRenter {
    firstName: string;
    email: string;
}
