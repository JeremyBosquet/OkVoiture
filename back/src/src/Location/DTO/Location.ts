import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class newLocationDTO {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    carBrand: string;

    @IsNotEmpty()
    carModel: string;

    @IsNotEmpty()
    carYear: number;

    @IsNotEmpty()
    town: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    pricePerDay: number;

    image: Express.Multer.File;
}

export class idDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}

export class pageDto {
    @IsNotEmpty()
    page: number;
}

export class Reservation {
    @IsNotEmpty()
    firstName: string;
    
    @Expose()
    @IsNotEmpty()
    startDate: Date;
    
    @Expose()
    @IsNotEmpty()
    endDate: Date;
    
    @IsNotEmpty()
    email: string;
    
    @Expose()
    createdAt: Date;
}

export interface INewRenter {
    firstName: string;
    email: string;
}

export class reserveLocationDTO {
    @IsNotEmpty()
    @IsUUID()
    locationId: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;
}

