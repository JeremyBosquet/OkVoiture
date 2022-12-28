import { IsEmail, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

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

export interface INewRenter {
    firstName: string;
    email: string;
}

export interface Ireservation {
    firstName: string;
    startDate: Date;
    endDate: Date;
    email: string;
    createdAt: Date;
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