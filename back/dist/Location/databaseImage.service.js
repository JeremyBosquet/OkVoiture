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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const DatabaseImage_1 = require("./Entities/DatabaseImage");
let DatabaseImageService = class DatabaseImageService {
    constructor(databaseImagesRepository) {
        this.databaseImagesRepository = databaseImagesRepository;
    }
    async uploadDatabaseFile(dataBuffer, filename) {
        const newFile = this.databaseImagesRepository.create({
            filename,
            data: dataBuffer
        });
        await this.databaseImagesRepository.save(newFile);
        return newFile;
    }
    async getFileById(fileId) {
        const file = await this.databaseImagesRepository.findOneBy({ id: fileId });
        if (!file) {
            return null;
        }
        return file;
    }
    isValidImageType(image) {
        const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        return validMimeTypes.includes(image.mimetype);
    }
    isValidImage(image) {
        if (!image || !image.buffer || !image.originalname)
            return false;
        if (image.size > 1e7)
            return false;
        return true;
    }
};
DatabaseImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(DatabaseImage_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabaseImageService);
exports.default = DatabaseImageService;
//# sourceMappingURL=databaseImage.service.js.map