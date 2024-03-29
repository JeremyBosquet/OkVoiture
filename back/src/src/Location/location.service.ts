import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Response } from "express";
import { Repository } from "typeorm";
import DatabaseImageService from "./databaseImage.service";
import { newLocationDTO, Reservation, reserveLocationDTO } from "./DTO/Location";
import DatabaseImage from "./Entities/DatabaseImage";
import Location from "./Entities/Location";
import RenterService from "./renter.service";
import { calcPrice, capitalizeFirstLetter, changeDateFormat, checkEmail, convertDateStringToDate, createRes } from "../Utils/Utils";
import Renter from "./Entities/Renter";
import { RenterData } from "./DTO/Renter";

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
        private readonly renterService: RenterService,
        private readonly databaseFilesService: DatabaseImageService,
        @InjectRepository(Renter)
        private readonly rentersRepository: Repository<Renter>,
        private readonly httpService: HttpService
    ) {}

    private towns = null;

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
            town: body.town,
            startDate: body.startDate.toString(),
            endDate: body.endDate.toString(),
            pricePerDay: body.pricePerDay,
            image: newImage,
            imageId: newImage.id,
            reservations: []
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

        return plainToInstance(Location, location, { excludeExtraneousValues: true });
    }

    // Retourne toutes les locations
    async getAllLocations(): Promise<Location[]> {
        const locations = await this.locationRepository.find();

        return plainToInstance(Location, locations, { excludeExtraneousValues: true });
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

    // Recupere toutes les villes de polynesie francaise depuis l'api de geo.gouv.fr et les retourne en les ajoutant dans la variable towns
    async getTowns(): Promise<string[]> {
        if (this.towns === null) { 
            try {
                const response = await this.httpService.get('https://geo.api.gouv.fr/departements/987/communes').toPromise();
                if (response.status !== 200)
                    return null;
                const towns = [];
                
                for (let i = 0; i < response.data.length; i++) {
                    towns.push(response.data[i].nom);
                }
    
                this.towns = towns;
            } catch (error) {
                return null;
            }
        }

        return this.towns;
    }

    // Retourne la liste des reservations d'une location sans les informations sensibles
    async getReservationsByLocation(location: Location): Promise<Reservation[]> {
        return plainToInstance(Reservation, location.reservations, { excludeExtraneousValues: true });
    }

    // Retourne toutes les locations triées par prix croissant sans les informations sensibles
    async getLocationSortedByLowestPrice(): Promise<Location[]> {
        try {
            const locations = await this.locationRepository.find({order: {pricePerDay: "ASC"}});

            for (let i = 0; i < locations.length; i++) {
                locations[i].reservations = await this.getReservationsByLocation(locations[i]);
            }

            return (plainToInstance(Location, locations, { excludeExtraneousValues: true }));
        } catch (error) {
            return [];
        }
    }

    // Recuperation des donnees de locations d'un loueur (locations, nb_reservations)
    async getLocationsAndReservationsFromRenter(email: string): Promise<{locations: Location[], nb_reservations: number}> {
        try {
            const locations = await this.locationRepository.find({where: {email: email}});
            let nb_reservations = 0;
            for (let i = 0; i < locations.length; i++) {
                nb_reservations += locations[i].reservations.length;
            }
            const LocationsAndReservations = {
                locations: locations,
                nb_reservations: nb_reservations
            }
            return (LocationsAndReservations);
        } catch (error) {
            return {
                locations: [], 
                nb_reservations: 0
            };
        }
    }

    // Recuperation des donnees de tous les loueurs (loueur, locations, nb_reservations)
    async getDataFromAllRenters(): Promise<RenterData[]> {
        try {
            const renters = await this.rentersRepository.find();
            let rentersData : RenterData[]  = [];

            for (let i = 0; i < renters.length; i++) {
                const locationsAndReservations = await this.getLocationsAndReservationsFromRenter(renters[i].email);
                const renterData : RenterData = {
                    renter: renters[i],
                    locations: locationsAndReservations.locations,
                    nb_reservations: locationsAndReservations.nb_reservations
                }
                rentersData.push(renterData);
            }

            return (rentersData);
        } catch (error) {
            return [];
        }
    }

    // return true si une reservation est deja dans les dates données, false sinon
    isAlreadyReservedForTheseDates(location: Location, startDate: Date, endDate: Date): boolean {
        const reservations = location.reservations;

        for (let i = 0; i < reservations.length; i++) {
            const reservation : Reservation = reservations[i];
            const reservationStartDate = changeDateFormat(reservation.startDate);
            const reservationEndDate = changeDateFormat(reservation.endDate);

            if (startDate >= reservationStartDate && startDate <= reservationEndDate ||
                endDate >= reservationStartDate && endDate <= reservationEndDate) {
                return true;
            }
        }
        return false;
    }

    // Crée une nouvelle reservation pour la location si les données sont valides
    async createNewReservationLocation(body: reserveLocationDTO): Promise<void> {
        const location = await this.locationRepository.findOneBy({id: body.locationId});

        const newReservation : Reservation = {
            firstName: capitalizeFirstLetter(body.firstName),
            startDate: body.startDate,
            endDate: body.endDate,
            email: body.email.toLowerCase(),
            totalPrice: calcPrice(location.pricePerDay, body.startDate, body.endDate),
            createdAt: new Date()
        }

        location.reservations.push(newReservation);
        await this.locationRepository.save(location);
    }

    async deleteReservation(locationId: string, startDate: Date): Promise<void> {
        const location = await this.locationRepository.findOneBy({id: locationId});

        if (location === undefined)
            return;

        const reservations = location.reservations;
        for (let i = 0; i < reservations.length; i++) {
            if (reservations[i].startDate === startDate) {
                reservations.splice(i, 1);
                break;
            }
        }

        await this.locationRepository.save(location);
    }

    // Retourne true si les données sont valides, false sinon
    async verifyLocationData(body: newLocationDTO, image: Express.Multer.File, res: Response): Promise<boolean> {
        const startDate = changeDateFormat(body.startDate);
        const endDate = changeDateFormat(body.endDate);

        const isOnlySpace = /^\s*$/;

        if (!this.databaseFilesService.isValidImage(image)) {
            createRes(HttpStatus.BAD_REQUEST, "L'image est manquante ou invalide (taille max: 10Mo)", res);
            return false;
        }
        
        if (!this.databaseFilesService.isValidImageType(image)) {
            createRes(HttpStatus.BAD_REQUEST, "Le type de l'image est invalide, types accepté: (jpeg, jpg, png)", res);
            return false;
        }

        if (body.firstName.length < 2 || body.firstName.length > 20 || isOnlySpace.test(body.firstName)) {
            createRes(HttpStatus.BAD_REQUEST, "Le prenom est invalide", res);
            return false;
        }

        if (!checkEmail(body.email)) {
            createRes(HttpStatus.BAD_REQUEST, "L'adresse email est invalide", res);
            return false;
        }

        if (body.carBrand.length < 2 || body.carBrand.length > 20 || isOnlySpace.test(body.carBrand)) {
            createRes(HttpStatus.BAD_REQUEST, "La marque du vehicule est invalide", res);
            return false;
        }

        if (body.carModel.length < 2 || body.carModel.length > 20 || isOnlySpace.test(body.carModel)) {
            createRes(HttpStatus.BAD_REQUEST, "Le modele du vehicule est invalide", res);
            return false;
        }

        if (body.carYear < 1900 || body.carYear > new Date().getFullYear()) {
            createRes(HttpStatus.BAD_REQUEST, "L'annee du vehicule est invalide", res);
            return false;
        }

        if (body.town.length < 2 || body.town.length > 20 || isOnlySpace.test(body.town)) {
            createRes(HttpStatus.BAD_REQUEST, "La ville est invalide", res);
            return false;
        }

        const towns = await this.getTowns();
        if (towns !== null && !towns.includes(body.town)) {
            createRes(HttpStatus.BAD_REQUEST, "La ville n'est pas valide", res);
            return false;
        }

        if (startDate > endDate) {
            createRes(HttpStatus.BAD_REQUEST, "La date de debut doit etre inferieur a la date de fin", res);
            return false;
        }

        if (body.pricePerDay <= 0) {
            createRes(HttpStatus.BAD_REQUEST, "Le prix par jour doit etre superieur a 0", res);
            return false;
        }

        if (body.pricePerDay > 2000000) {
            res.status(HttpStatus.BAD_REQUEST).send({
                message: "Le prix par jour est trop élevé (max: 2000000)",
                code: HttpStatus.BAD_REQUEST
            });
            return false;
        }

        return true;
    }

    // Retourne true si les données sont valides, false sinon
    async verifyReservationData(body: reserveLocationDTO, res: Response): Promise<boolean> {
        const location = await this.locationRepository.findOneBy({id: body.locationId});
        const startDate = changeDateFormat(body.startDate);
        const endDate = changeDateFormat(body.endDate);

        const isOnlySpace = /^\s*$/;

        if (!location) {
            createRes(HttpStatus.BAD_REQUEST, "Aucune location ne correspond a cet id", res);
            return false;
        }        

        if (body.firstName.length < 2 || body.firstName.length > 20 || isOnlySpace.test(body.firstName)) {
            createRes(HttpStatus.BAD_REQUEST, "Le prenom est invalide", res);
            return false;
        }

        if (!checkEmail(body.email)) {
            createRes(HttpStatus.BAD_REQUEST, "L'adresse email est invalide", res);
            return false;
        }

        if (body.email.toLowerCase() === location.email.toLowerCase()) {
            createRes(HttpStatus.BAD_REQUEST, "Vous ne pouvez pas reserver votre propre location", res);
            return false;
        }

        if (startDate > endDate) {
            createRes(HttpStatus.BAD_REQUEST, "La date de debut doit etre inferieur a la date de fin", res);
            return false;
        }

        if ((startDate < convertDateStringToDate(location.startDate) || startDate > convertDateStringToDate(location.endDate)) ||
            (endDate < convertDateStringToDate(location.startDate) || endDate > convertDateStringToDate(location.endDate))) {
            createRes(HttpStatus.BAD_REQUEST, "La location n'est pas disponible pour cette periode", res);
            return false;
        }

        if (this.isAlreadyReservedForTheseDates(location, startDate, endDate)) {
            createRes(HttpStatus.BAD_REQUEST, "La location n'est pas disponible pour cette periode", res);
            return false;
        }

        return true;
    }
}