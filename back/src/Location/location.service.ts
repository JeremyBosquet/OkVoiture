import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Repository } from "typeorm";
import DatabaseImageService from "./databaseImage.service";
import { newLocationDTO } from "./DTO/Location";
import DatabaseImage from "./Entities/DatabaseImage";
import Location from "./Entities/Location";
import RenterService from "./renter.service";
import { capitalizeFirstLetter } from "./Utils/Utils";

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
        private readonly renterService: RenterService,
        private readonly databaseFilesService: DatabaseImageService,
    ) {}

    async createNewLocation(body: newLocationDTO, image: Express.Multer.File): Promise<void> {
        // Upload de l'image dans la base de données
        const newImage = await this.databaseFilesService.uploadDatabaseFile(image.buffer, image.originalname);
        
        // Creation de la location
        const newLocation = this.locationRepository.create({
            firstName: capitalizeFirstLetter(body.firstName),
            email: body.email.toLowerCase(),
            carBrand: capitalizeFirstLetter(body.carBrand),
            carModel: capitalizeFirstLetter(body.carModel),
            carYear: body.carYear,
            town: capitalizeFirstLetter(body.town),
            startDate: body.startDate.toString(),
            endDate: body.endDate.toString(),
            pricePerDay: body.pricePerDay,
            image: newImage,
            imageId: newImage.id
        });

        // Sauvegarde de la location dans la base de données
        await this.locationRepository.save(newLocation)

        // Creation du loueur si il n'existe pas
        await this.renterService.createNewRenterIfNotExist({
            firstName: body.firstName,
            email: body.email
        });
    }

    // Retourne la location si elle existe
    async getLocationById(locationId: string): Promise<Location> {
        const location = await this.locationRepository.findOneBy({id: locationId});
        return location;
    }

    // Retourne toutes les locations
    async getAllLocations(): Promise<Location[]> {
        const locations = await this.locationRepository.find();
        return locations;
    }

    // Retourne l'image de la location si elle existe, null sinon
    async getImageLocationById(locationId: string): Promise<DatabaseImage> {
        const location = await this.locationRepository.findOneBy({id: locationId});
        if (!location)
            return null;

        const image = await this.databaseFilesService.getFileById(location.imageId);
        if (image)
            return image;
        return null;
    }

    // Retourne true si les données sont valides, false sinon
    verifyLocationData(body: newLocationDTO, image: Express.Multer.File, res: Response): boolean {
        if (!this.databaseFilesService.isValidImage(image)) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "L'image est manquante ou invalide (taille max: 10Mo)",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }
        
        if (!this.databaseFilesService.isValidImageType(image)) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Le type de l'image est invalide, types accepté: (jpeg, jpg, png)",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.firstName.length < 2 || body.firstName.length > 20) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Le prenom est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if ((body.email.length < 5 || body.email.length > 50) || 
            !body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "L'adresse email est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.carBrand.length < 2 || body.carBrand.length > 20) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "La marque du vehicule est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.carModel.length < 2 || body.carModel.length > 20) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Le modele du vehicule est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.carYear < 1900 || body.carYear > 2021) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "L'annee du vehicule est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.town.length < 2 || body.town.length > 20) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "La ville est invalide",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.startDate > body.endDate) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "La date de debut doit etre inferieur a la date de fin",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        if (body.pricePerDay <= 0) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Le prix par jour doit etre superieur a 0",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        return true;
    }

}