"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const databaseImage_service_1 = require("./databaseImage.service");
const Location_1 = require("./Entities/Location");
const renter_service_1 = require("./renter.service");
const Utils_1 = require("./Utils/Utils");
let LocationService = class LocationService {
    constructor(locationRepository, renterService, databaseFilesService) {
        this.locationRepository = locationRepository;
        this.renterService = renterService;
        this.databaseFilesService = databaseFilesService;
    }
    async createNewLocation(body, image) {
        const newImage = await this.databaseFilesService.uploadDatabaseFile(image.buffer, image.originalname);
        const newLocation = this.locationRepository.create({
            firstName: (0, Utils_1.capitalizeFirstLetter)(body.firstName),
            email: body.email.toLowerCase(),
            carBrand: (0, Utils_1.capitalizeFirstLetter)(body.carBrand),
            carModel: (0, Utils_1.capitalizeFirstLetter)(body.carModel),
            carYear: body.carYear,
            town: (0, Utils_1.capitalizeFirstLetter)(body.town),
            startDate: body.startDate.toString(),
            endDate: body.endDate.toString(),
            pricePerDay: body.pricePerDay,
            image: newImage,
            imageId: newImage.id
        });
        await this.locationRepository.save(newLocation);
        await this.renterService.createNewRenterIfNotExist({
            firstName: body.firstName,
            email: body.email
        });
    }
    async getLocationById(locationId) {
        const location = await this.locationRepository.findOneBy({ id: locationId });
        return location;
    }
    async getAllLocations() {
        const locations = await this.locationRepository.find();
        return locations;
    }
    async getImageLocationById(locationId) {
        const location = await this.locationRepository.findOneBy({ id: locationId });
        if (!location)
            return null;
        const image = await this.databaseFilesService.getFileById(location.imageId);
        if (image)
            return image;
        return null;
    }
    verifyLocationData(body, res) {
        if (body.firstName.length < 2 || body.firstName.length > 20) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "Le prenom est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if ((body.email.length < 5 || body.email.length > 50) ||
            !body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "L'adresse email est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.carBrand.length < 2 || body.carBrand.length > 20) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "La marque du vehicule est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.carModel.length < 2 || body.carModel.length > 20) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "Le modele du vehicule est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.carYear < 1900 || body.carYear > 2021) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "L'annee du vehicule est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.town.length < 2 || body.town.length > 20) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "La ville est invalide",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.startDate > body.endDate) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "La date de debut doit etre inferieur a la date de fin",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        if (body.pricePerDay <= 0) {
            res.status(common_1.HttpStatus.BAD_REQUEST).send({
                message: "Le prix par jour doit etre superieur a 0",
                code: common_1.HttpStatus.BAD_REQUEST
            });
            return false;
        }
        return true;
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Location_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        renter_service_1.default,
        databaseImage_service_1.default])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map