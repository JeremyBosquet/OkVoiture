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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const stream_1 = require("stream");
const Location_1 = require("./DTO/Location");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async createNewLocation(image, body, res) {
        if (!this.locationService.verifyLocationData(body, image, res))
            return;
        try {
            await this.locationService.createNewLocation(body, image);
        }
        catch (e) {
            res.status(common_2.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Une erreur est survenue, veuillez réessayer plus tard",
                code: common_2.HttpStatus.INTERNAL_SERVER_ERROR
            });
            return;
        }
        res.status(common_2.HttpStatus.OK).send({
            message: "Votre véhicule a bien été ajouté.",
            code: common_2.HttpStatus.OK
        });
    }
    async getAllLocations(res) {
        const locations = await this.locationService.getAllLocations();
        res.status(common_2.HttpStatus.OK).json(locations);
    }
    async getLocationById(param, res) {
        const location = await this.locationService.getLocationById(param.id);
        res.status(common_2.HttpStatus.OK).json(location);
    }
    async getImageLocation(param, res) {
        const image = await this.locationService.getImageLocationById(param.id);
        if (!image) {
            res.status(common_2.HttpStatus.NOT_FOUND).send({ message: "Image not found", code: common_2.HttpStatus.NOT_FOUND });
            return;
        }
        const stream = stream_1.Readable.from(image.data);
        stream.pipe(res);
    }
};
__decorate([
    (0, common_2.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Location_1.newLocationDTO, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createNewLocation", null);
__decorate([
    (0, common_2.Get)("/all"),
    __param(0, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllLocations", null);
__decorate([
    (0, common_2.Get)("/:id"),
    __param(0, (0, common_2.Param)(common_2.ValidationPipe)),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Location_1.idDto, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationById", null);
__decorate([
    (0, common_2.Get)("image/:id"),
    __param(0, (0, common_2.Param)(common_2.ValidationPipe)),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Location_1.idDto, Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getImageLocation", null);
LocationController = __decorate([
    (0, common_2.Controller)('api/v1/location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map