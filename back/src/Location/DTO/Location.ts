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

export interface INewRenter {
    firstName: string;
    email: string;
}