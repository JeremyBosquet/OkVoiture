/// <reference types="multer" />
import { Response } from "express";
import { Repository } from "typeorm";
import DatabaseImageService from "./databaseImage.service";
import { newLocationDTO } from "./DTO/Location";
import DatabaseImage from "./Entities/DatabaseImage";
import Location from "./Entities/Location";
import RenterService from "./renter.service";
export declare class LocationService {
    private locationRepository;
    private readonly renterService;
    private readonly databaseFilesService;
    constructor(locationRepository: Repository<Location>, renterService: RenterService, databaseFilesService: DatabaseImageService);
    createNewLocation(body: newLocationDTO, image: Express.Multer.File): Promise<void>;
    getLocationById(locationId: string): Promise<Location>;
    getAllLocations(): Promise<Location[]>;
    getImageLocationById(locationId: string): Promise<DatabaseImage>;
    verifyLocationData(body: newLocationDTO, image: Express.Multer.File, res: Response): boolean;
}
