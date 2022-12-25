/// <reference types="multer" />
import { Response } from 'express';
import { idDto, newLocationDTO } from './DTO/Location';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    createNewLocation(image: Express.Multer.File, body: newLocationDTO, res: Response): Promise<void>;
    getAllLocations(res: Response): Promise<void>;
    getLocationById(param: idDto, res: Response): Promise<void>;
    getImageLocation(param: idDto, res: Response): Promise<void>;
}
